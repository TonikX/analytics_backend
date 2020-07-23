import pandas as pd
import re
import time
import sys

start_time = time.time()

degree = {
    "06": "Бакалавр",
    "071": "Специали",
    "072": "Магистр"
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
    "6": "специализац",
    "7": "факультетский модуль",
    "8": "цифровая культура в профессиональной деятельности",
    "9": "цифровая культура в предметной области мегафакультета",
    "10": "профессиональный модуль",
    "11": "факультативные дисциплины",
    "12": "практики",
    "13": "гиа"
}
ognp_codes = {
    "1": ["12.03.04", "14.03.01", "16.03.03", "18.03.02", "19.03.01", "16.04.03", "18.04.02", "19.04.01", "19.04.02",
          "19.04.03", "20.04.01", "27.04.01"],
    "2": ["12.03.01", "13.03.02", "15.03.04", "15.03.06", "24.03.02", "27.03.04", "11.04.03", "12.04.01", "13.04.02",
          "15.04.02", "15.04.04", "15.04.06", "23.04.03", "24.04.01", "24.04.02", "27.04.03"],
    "3": ["09.03.01", "09.03.04", "10.03.01", "11.03.03", "23.03.03", "44.03.04", "09.04.01", "09.04.04", "10.04.01",
          "27.04.03", "27.04.04"],
    "4": ["27.03.05", "38.03.05", "27.04.02", "27.04.05", "27.04.08", "38.04.01", "38.04.05"],
    "5": ["01.03.02", "09.03.02", "01.04.02", "02.04.03", "09.04.02"],
    "6": ["09.03.03", "11.03.02", "45.03.04", "07.04.04", "09.04.03", "11.04.02", "27.04.07", "45.04.04"],
    "7": ["12.03.02", "12.03.03", "12.03.05", "12.05.01", "16.03.01", "12.04.02", "12.04.03", "12.04.04", "12.04.05",
          "16.04.01"]
}


# remove multiple spaces and punctuation
def clean_text(text):
    cleaned = re.sub(r'[^\w\s]', ' ', text)
    cleaned = re.sub(' +', ' ', cleaned)
    cleaned = cleaned.replace('\xa0', '')
    cleaned = cleaned.replace('\t', '')
    return cleaned


# calculate first position
def get_pos_1(xlsx_degree):
    for d in degree:
        if re.search(degree[d], xlsx_degree, flags=re.IGNORECASE): return d


# calculate second and third positions
def get_pos_2_3(p_1, xlsx_subfieldcode, xlsx_component, xlsx_subj_code):
    for u in uni_module:
        if re.search(uni_module[u], xlsx_component, flags=re.IGNORECASE):
            if u != "11":
                return "0", u
            elif ((p_1 in ["06", "071"]) and xlsx_subj_code <= 9) or (p_1 == "072" and xlsx_subj_code <= 2):
                return "0", u
    for p in ognp_module:
        if re.search(ognp_module[p], xlsx_component, flags=re.IGNORECASE):
            for num in ognp_codes:
                if xlsx_subfieldcode in ognp_codes[num]:
                    return num, p
        elif re.match("модуль [0-9]", xlsx_component, flags=re.IGNORECASE):
            for num in ognp_codes:
                if xlsx_subfieldcode in ognp_codes[num]:
                    return num, "5"


def df_to_excel(data_frame, file):
    writer = pd.ExcelWriter(file, engine="xlsxwriter")
    data_frame.to_excel(writer, index=False)
    writer.close()


# find max 4th value
def get_max_4(dis_rep):
    list_of_4 = [int(dis_rep["DIS_CODE"].values[d].split("(", 1)[0].split(".")[3]) for d in
                 range(0, len(dis_rep["DIS_CODE"]))]
    if list_of_4: return max(list_of_4)
    else: return -1


def extract_3(dis_code):
    return dis_code.split("(", 1)[0].split(".")[2]


def sem_info(data_frame, subfield_name, subj, component, subj_code):
    df_1 = data_frame.loc[(data_frame["SUBFIELDNAME"] == subfield_name)
                          & (data_frame["SUBJECT"] == subj)
                          & (data_frame["COMPONENT"] == component)
                          & (data_frame["SUBJECT_CODE"] == subj_code)]
    sem_list = df_1["SEMESTER"].to_list()
    cred_list = df_1["CREDITS"].to_list()
    return "".join(map(str, sem_list)) + "/" + "".join(str(c) for c in cred_list).replace(".0", "")


def get_pos_4(rep, sem_xlsx, dis_code, subj, subfield_name):
    if subj not in rep["SUBJECT"].to_list(): return str(get_max_4(rep) + 1)
    else:
        rep1 = rep.loc[rep["SUBJECT"] == subj]
        if not rep1["DIS_CODE"].str.match(dis_code).any(): return str(get_max_4(rep) + 1)
        else:
            rep2 = rep1.loc[rep1["DIS_CODE"].str.match(dis_code)]
            if sem_xlsx not in rep2["SEM_INFO"].to_list(): return str(get_max_4(rep) + 1)
            else:
                rep3 = rep2.loc[rep2["SEM_INFO"] == sem_xlsx]
                rows = len(rep3["DIS_CODE"])
                count = 0
                for p in range(0, len(rep3["DIS_CODE"])):
                    if (rep3["SUBFIELDNAME"].values[p] != subfield_name) and (extract_3(dis_code) in ["12", "13"]):
                        count += 1
                        if count != rows: continue
                        else: return str(get_max_4(rep) + 1)
                    else: return str(rep3["DIS_CODE"].values[p].split(".")[3])


# generate unique code for each discipline
def generate_df_w_unique_code(in_df, sys_df=None):
    code_list = []
    out_df = in_df.copy()
    if (sys_df is None) or sys_df.empty:
        cols = list(in_df)
        cols.append("DIS_CODE")
        cols.append("SEM_INFO")
        sys_df = pd.DataFrame(columns=cols)
    in_df["COMPONENT"] = in_df["COMPONENT"].apply(clean_text)
    sys_df["COMPONENT"] = sys_df["COMPONENT"].apply(clean_text)
    for i in range(0, len(in_df["SUBFIELDNAME"])):
        sem = sem_info(in_df,
                       in_df.loc[i, "SUBFIELDNAME"],
                       in_df.loc[i, "SUBJECT"],
                       in_df.loc[i, "COMPONENT"],
                       in_df.loc[i, "SUBJECT_CODE"])
        pos_1 = get_pos_1(in_df.loc[i, "DEGREE"])
        if pos_1 is None:
            print("В строке", i + 2, "содержится название неизвестного уровня образования.")
            sys.exit()
        try:
            pos_2, pos_3 = get_pos_2_3(pos_1,
                                       in_df.loc[i, "SUBFIELDCODE"],
                                       in_df.loc[i, "COMPONENT"],
                                       in_df.loc[i, "SUBJECT_CODE"])
        except:
            print("В строке", i + 2, "содержится название неизвестного модуля или неизвестный шифр направления подготовки.")
            sys.exit()
        in_df.loc[i, "DIS_CODE"] = pos_1 + "." + pos_2 + "." + pos_3 + "."
        pos_4 = get_pos_4(sys_df,
                          sem,
                          in_df.loc[i, "DIS_CODE"],
                          in_df.loc[i, "SUBJECT"],
                          in_df.loc[i, "SUBFIELDNAME"])
        in_df.loc[i, "DIS_CODE"] = in_df.loc[i, "DIS_CODE"] + str(pos_4) + "." + str(in_df.loc[i, "YEAR"])
        sys_df = sys_df.append(in_df.loc[i])
        sys_df.iloc[-1, sys_df.columns.get_loc("SEM_INFO")] = sem
        sys_df = sys_df.drop_duplicates()
        code_list.append(in_df.loc[i, "DIS_CODE"])
    out_df["DIS_CODE"] = code_list
    print('Return')
    return out_df, sys_df

#Example
#df1 = pd.read_excel("source_files/subj_2020_2021_bachelor45_01.xlsx")
#discipline_rep = pd.read_excel("source_files/discipline_bank_updated.xlsx")
#processed_data, db = generate_df_w_unique_code(df1, discipline_rep)
#df_to_excel(processed_data, "source_files/new_disciplines_full.xlsx")
#df_to_excel(db, "source_files/discipline_bank_updated.xlsx")

#print("Done! Go check the file :)")
#print("--- %s seconds ---" % (time.time() - start_time))
