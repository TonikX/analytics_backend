import pandas as pd
import numpy as np
import re
import time
import sys

degree = {
    "06": ["Академический бакалавр", "Специалист"],
    "07": ["Магистр"]
}
uni_module = {
    "0": "универсальный модуль",
    "1": "модуль философия мышление",
    "2": "модуль цифровая культура",
    "3": "модуль креативные технологии",
    "4": "модуль предпринимательская культура",
    "5": "модуль soft skills",
    "6": "огнп",
    "7": "физическая культура",
    "8": "общеуниверситетские дисциплины мировоззренческого модуля",
    "9": "иностранный язык",
    "10": "элективная дисциплина soft skills",
    "11": "факультативные дисциплины"
}
ognp_module = {
    "0": "математический модуль",
    "1": "естественнонаучный модуль",
    "2": "общепрофессиональный модуль",
    "3": "элективный модуль по группе направлений",
    "4": "межпрофильный модуль факультета",
    "5": "профильный профессиональный модуль",
    # "6": "специализац",
    "7": "факультетский модуль",
    "8": "цифровая культура в профессиональной деятельности",
    "9": "цифровая культура в предметной области мегафакультета",
    "10": "профессиональный модуль",
    "11": "факультативные дисциплины",
    "12": "практики",
    "13": "гиа"
}
ognp_codes = {
    "1": ["12.03.04", "14.03.01", "16.03.03", "18.03.02", "19.03.01", "16.04.03", "18.04.02", "19.04.01", "19.04.02", "19.04.03", "20.04.01", "27.04.01"],
    "2": ["12.03.01", "13.03.02", "15.03.04", "15.03.06", "24.03.02", "27.03.04", "11.04.03", "12.04.01", "13.04.02", "15.04.02", "15.04.04", "15.04.06", "23.04.03", "24.04.01", "24.04.02", "27.04.03"],
    "3": ["09.03.01", "09.03.04", "10.03.01", "11.03.03", "23.03.03", "44.03.04", "09.04.01", "09.04.04", "10.04.01", "27.04.03", "27.04.04"],
    "4": ["27.03.05", "38.03.05", "27.04.02", "27.04.05", "27.04.08", "38.04.01", "38.04.05"],
    "5": ["01.03.02", "09.03.02", "01.04.02", "02.04.03", "09.04.02"],
    "6": ["09.03.03", "11.03.02", "45.03.04", "07.04.04", "09.04.03", "11.04.02", "27.04.07", "45.04.04"],
    "7": ["12.03.02", "12.03.03", "12.03.05", "12.05.01", "16.03.01", "12.04.02", "12.04.03", "12.04.04", "12.04.05", "16.04.01"]
}


# remove multiple spaces and punctuation
def clean_text(text):
    cleaned = re.sub(r'[^\w\s]', ' ', text)
    cleaned = re.sub(' +', ' ', cleaned)
    cleaned = cleaned.replace('\xa0', '')
    cleaned = cleaned.replace('\t', '')
    return cleaned


# calculate positions 1-3
def get_pos_1_2_3(xlsx_degree, xlsx_sf_code, xlsx_comp, xlsx_subj_code, line=""):
    list_of_degrees = [d for d in degree if xlsx_degree in degree[d]]
    if not list_of_degrees: sys.exit("Неизвестный уровень образования в %sзаписи." % line)
    else: p1 = list_of_degrees[0]
    uni = [u for u in uni_module if re.match(uni_module[u], xlsx_comp, flags=re.IGNORECASE)]
    module = ["5" if re.match("модуль [0-9]", xlsx_comp, flags=re.IGNORECASE) else
              "6" if re.search("специализац", xlsx_comp, flags=re.IGNORECASE) else
              p if re.match(ognp_module[p], xlsx_comp, flags=re.IGNORECASE) else
              np.nan for p in ognp_module]
    module = [m for m in module if str(m) != 'nan']
    if not uni and not module: sys.exit("Неизвестный модуль в %sзаписи." % line)
    if uni:
        if uni[0] != "11": return p1 + "." + "0" + "." + uni[0] + "."
        elif (p1 == "06" and xlsx_subj_code <= 9) or (p1 == "072" and xlsx_subj_code <= 2): return p1 + "." + "0" + "." + uni[0] + "."
    if module:
        ognp_num = [num for num in ognp_codes if xlsx_sf_code in ognp_codes[num]]
        if not ognp_num: sys.exit("Неизвестный шифр направления подготовки в %sзаписи." % line)
        else: return p1 + "." + ognp_num[0] + "." + module[0] + "."


# write df to excel file
def df_to_excel(data_frame, file):
    writer = pd.ExcelWriter(file, engine="xlsxwriter")
    data_frame.to_excel(writer, index=False)
    writer.close()


# find max 4th value
def get_max_4(dis_rep):
    list_of_4 = [int(dis_rep["DIS_CODE"][d].split(".")[3]) for d in dis_rep.index.values]
    if list_of_4: return max(list_of_4)
    else: return -1


# collect info on semesters and credits    
def unit_info(data, sf_name, subj, comp, subj_code, cycle):
    credit_units = [0 for i in range(0, 12)]
    units = data.loc[(data["SUBFIELDNAME"] == sf_name) & (data["SUBJECT"] == subj) & (data["COMPONENT"] == comp) & (data["SUBJECT_CODE"] == subj_code) & (data["CYCLE"] == cycle)]
    try:
        for u in units.index.values:
            if pd.isna(units["CREDITS"][u]) or units["CREDITS"][u] == 0: credit_units[int(units["SEMESTER"][u]) - 1] = "-"
            elif units["SEMESTER"][u] == ".": credit_units[11] = int(units["CREDITS"][u])
            else: credit_units[int(units["SEMESTER"][u]) - 1] = int(units["CREDITS"][u])
    except:
        pass
    return ",".join(map(str, credit_units))


# calculate position 4
def get_pos_4(rep, sem_xlsx, dis_code, subj, sf_name):
    if subj not in rep["SUBJECT"].to_list(): return str(get_max_4(rep) + 1)
    else:
        rep1 = rep.loc[rep["SUBJECT"] == subj]
        if not rep1["DIS_CODE"].str.match(dis_code).any(): return str(get_max_4(rep) + 1)
        else:
            rep2 = rep1.loc[rep1["DIS_CODE"].str.match(dis_code)]
            if sem_xlsx not in rep2["SEM_INFO"].to_list(): return str(get_max_4(rep) + 1)
            else:
                rep3 = rep2.loc[rep2["SEM_INFO"] == sem_xlsx].reset_index(drop=True)
                rows = len(rep3["DIS_CODE"])
                count = 0
                for p in rep3.index.values:
                    if (rep3["SUBFIELDNAME"][p] != sf_name) and (dis_code.split(".")[2] in ["12", "13"]):
                        count += 1
                        if count != rows: continue
                        else: return str(get_max_4(rep) + 1)
                    else: return str(rep3["DIS_CODE"][p].split(".")[3])


# create sys_df if empty or does not exist
def create_sys_df():
    cols = ["SUBFIELDCODE", "SUBFIELDNAME", "YEAR", "DEGREE", "SUBJECT_CODE", "SUBJECT", "COMPONENT", "SEM_INFO", "DIS_CODE"]
    sys_df = pd.DataFrame(columns=cols)
    return sys_df


# add new line to sys_df
def append_sys_df(sys_df, sf_code, sf_name, year, subj_degree, subj_code, subj, comp, sem_info, dis_code):
    to_append = [sf_code, sf_name, year, subj_degree, subj_code, subj, comp, sem_info, dis_code]
    sys_df.loc[len(sys_df)] = to_append
    sys_df = sys_df.drop_duplicates().reset_index(drop=True)
    return sys_df


# generate unique code for each discipline in excel file
def generate_df_w_unique_code(in_df, sys_df=None):
    code_list = []
    out_df = in_df.copy()
    if (sys_df is None) or sys_df.empty: sys_df = create_sys_df()
    in_df["COMPONENT"] = in_df["COMPONENT"].apply(clean_text)
    for i in in_df.index.values:
        sem = unit_info(in_df, in_df["SUBFIELDNAME"][i], in_df["SUBJECT"][i], in_df["COMPONENT"][i], in_df["SUBJECT_CODE"][i], in_df["CYCLE"][i])
        in_df.loc[i, "DIS_CODE"] = get_pos_1_2_3(in_df["DEGREE"][i], in_df["SUBFIELDCODE"][i], in_df["COMPONENT"][i], in_df["SUBJECT_CODE"][i], str(i + 2) + " ")
        p4 = get_pos_4(sys_df, sem, in_df["DIS_CODE"][i], in_df["SUBJECT"][i], in_df["SUBFIELDNAME"][i])
        in_df.loc[i, "DIS_CODE"] = in_df["DIS_CODE"][i] + str(p4) + "." + str(in_df["YEAR"][i])
        code_list.append(in_df["DIS_CODE"][i])
        sys_df = append_sys_df(sys_df, in_df["SUBFIELDCODE"][i], in_df["SUBFIELDNAME"][i], in_df["YEAR"][i], in_df["DEGREE"][i], in_df["SUBJECT_CODE"][i], in_df["SUBJECT"][i], in_df["COMPONENT"][i], sem, in_df["DIS_CODE"][i])
    out_df["DIS_CODE"] = code_list
    return out_df, sys_df


# generate unique code for a discipline that already exists
def generate_single_unique_code(sf_code, sf_name, year, subj_degree, subj_code, subj, comp, credit_units, sys_df=None):
    if (sys_df is None) or sys_df.empty: sys_df = create_sys_df()
    comp = clean_text(comp)
    dis_code = get_pos_1_2_3(subj_degree, sf_code, comp, subj_code)
    sem = ",".join(map(str, credit_units))
    p4 = get_pos_4(sys_df, sem, dis_code, subj, sf_name)
    dis_code = dis_code + str(p4) + "." + str(year)
    sys_df = append_sys_df(sys_df, sf_code, sf_name, year, subj_degree, subj_code, subj, comp, sem, dis_code)
    return dis_code, sys_df
#Example
#df1 = pd.read_excel("source_files/subj_2020_2021_bachelor45_01.xlsx")
#discipline_rep = pd.read_excel("source_files/discipline_bank_updated.xlsx")
#processed_data, db = generate_df_w_unique_code(df1, discipline_rep)
#df_to_excel(processed_data, "source_files/new_disciplines_full.xlsx")
#df_to_excel(db, "source_files/discipline_bank_updated.xlsx")

#print("Done! Go check the file :)")
#print("--- %s seconds ---" % (time.time() - start_time))
# generate code for a discipline that already exists

#discipline_rep = pd.read_excel("source_files/discipline_bank.xlsx")
#discipline_code, db = generate_single_unique_code("19.03.01",
                                                  #"Биотехнология",
                                                  #2020,
                                                  #"Академический бакалавр",
                                                  #32,
                                                  #"1.2. Аналитическая химия и физико-химические методы анализа",
                                                  #"Элективный модуль по группе направлений",
                                                  #[0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                                                  #discipline_rep)
#print(discipline_code)
#df_to_excel(db, "source_files/discipline_bank.xlsx")



