import createReport from 'docx-templates';

import {WithStyles} from "@material-ui/core";
import styles from "./styles";
import {CertificationActions, CertificationState} from "../../types";
import React from "react";
import connect from "./connect";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";


// @ts-ignore
import rawFile from '../../template-gia.docx'
import {CertificationFields, CertificationMarkFields} from "../../enum";
import {markTypesRussian} from "../../constants";
import {getInputListArray} from "../InputList";

interface DownloadProps extends WithStyles<typeof styles> {
    actions: CertificationActions;
    fields: CertificationState;
}

class Download extends React.Component<DownloadProps> {

    getPreparedFields = (fields: CertificationState) => {
        return {
            ...fields,
            [CertificationFields.STRUCTURAL_UNIT]: fields[CertificationFields.STRUCTURAL_UNIT]?.title ?? '',
            [CertificationFields.STRUCTURE_ELEMENTS_OPTIONAL]:
                fields[CertificationFields.STRUCTURE_ELEMENTS_OPTIONAL].split(';').map(str => str.toLowerCase()),
            [CertificationFields.GENERAL_PROVISIONS_OTHER_DOCUMENTS]:
                getInputListArray(fields[CertificationFields.GENERAL_PROVISIONS_OTHER_DOCUMENTS]),
            ...(this.getPreparedMarks(fields)),
        }
    }

    getPreparedMarks = (fields: CertificationState) => {
        const fieldNames = markTypesRussian.map(type => type.field);
        const marks: any = {};
        for (const fieldName of fieldNames) {
            marks[fieldName] = {};
            for (const markType of Object.values(CertificationMarkFields)) {
                if (markType === 'id') continue;
                marks[fieldName][markType] = this.multilineToList((fields as any)[fieldName][markType]);
            }
        }
        return marks;
    }


    multilineToList = (str: string) => {
        if (!str || str.length === 0) return [];
        return str.split(/\r?\n/g);
    }

    handleDownload = (fields: CertificationState) => async () => {

        const arrayBuffer = await fetch(rawFile).then(r => r.arrayBuffer())
        const template = new Buffer(arrayBuffer);
        const preparedFields = this.getPreparedFields(fields);
        console.log(preparedFields);
        const report = await createReport({
            template,
            data: preparedFields,
        });

        const saveDataToFile = (data: any, fileName: any, mimeType: any) => {
            const blob = new Blob([data], {type: mimeType});
            const url = window.URL.createObjectURL(blob);
            downloadURL(url, fileName);
            setTimeout(() => {
                window.URL.revokeObjectURL(url);
            }, 1000);
        };

        const downloadURL = (data: any, fileName: any) => {
            const a = document.createElement('a');
            a.href = data;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();
        };

        saveDataToFile(
            report,
            'work-program-gia.docx',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        );
    }

    render() {
        const {classes, fields} = this.props;

        return (
            <div className={classes.input}>
                <Button variant='outlined'
                        onClick={this.handleDownload(fields)}>
                    Скачать рабочую программу
                </Button>
            </div>
        );
    }
}

export default connect(withStyles(styles)(Download));