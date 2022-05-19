import createReport from 'docx-templates';

import {WithStyles} from "@material-ui/core";
import styles from "./styles";
import {PracticeActions, PracticeState} from "../../types";
import React from "react";
import connect from "./connect";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";


// @ts-ignore
import rawFile from '../../template.docx'
import {PracticeFields, PracticeTypes} from "../../enum";
import {
    LANGUAGES,
    PRACTICE_FORMATS,
    PRACTICE_KINDS,
    PRACTICE_TYPES,
    PRACTICE_WAYS,
    QUALIFICATIONS
} from "../../constants";
import {LiteratureType} from "../../../Literature/types";

interface DownloadProps extends WithStyles<typeof styles> {
    actions: PracticeActions;
    fields: PracticeState;
}

class Download extends React.Component<DownloadProps> {

    getPreparedFields = (fields: PracticeState) => {
        return {
            ...fields,
            [PracticeFields.LANGUAGE]: this.findRussianLabel(LANGUAGES, fields[PracticeFields.LANGUAGE]),
            [PracticeFields.QUALIFICATION]: this.findRussianLabel(QUALIFICATIONS, fields[PracticeFields.QUALIFICATION]),
            [PracticeFields.KIND_OF_PRACTICE]: this.findRussianLabel(PRACTICE_KINDS, fields[PracticeFields.KIND_OF_PRACTICE]),
            [PracticeFields.TYPE_OF_PRACTICE]: this.findRussianLabel(PRACTICE_TYPES, fields[PracticeFields.TYPE_OF_PRACTICE]),
            [PracticeFields.WAY_OF_DOING_PRACTICE]: this.findRussianLabel(PRACTICE_WAYS, fields[PracticeFields.WAY_OF_DOING_PRACTICE]),
            [PracticeFields.FORMAT_PRACTICE]: this.findRussianLabel(PRACTICE_FORMATS, fields[PracticeFields.FORMAT_PRACTICE]),
            [PracticeFields.STRUCTURAL_UNIT]: fields[PracticeFields.STRUCTURAL_UNIT]?.title ?? '',
            isSeniorInter: fields[PracticeFields.TYPE_OF_PRACTICE] === PracticeTypes.SENIOR_INTER,
        }
    }

    getIndexedReferences = (refs: Array<LiteratureType>) => {
        return refs.map((ref, index) => ({ref, index: index + 1}));
    }

    findRussianLabel = (list: any, field: any) => {
        for (const {value, label} of list) {
            if (value === field) {
                return label;
            }
        }
        return null;
    }

    handleDownload = (fields: PracticeState) => async () => {

        const arrayBuffer = await fetch(rawFile).then(r => r.arrayBuffer())
        const template = new Buffer(arrayBuffer);
        const preparedFields = this.getPreparedFields(fields);
        const report = await createReport({template, data: {...preparedFields}})

        const saveDataToFile = (data:any, fileName:any, mimeType:any) => {
            const blob = new Blob([data], { type: mimeType });
            const url = window.URL.createObjectURL(blob);
            downloadURL(url, fileName);
            setTimeout(() => {
                window.URL.revokeObjectURL(url);
            }, 1000);
        };

        const downloadURL = (data:any, fileName:any) => {
            const a = document.createElement('a');
            a.href = data;
            a.download = fileName;
            document.body.appendChild(a);
            // a.style = 'display: none';
            a.click();
            a.remove();
        };

        saveDataToFile(
            report,
            'report.docx',
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