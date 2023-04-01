import createReport from 'docx-templates';

import {withStyles} from '@mui/styles';
import styles from "./styles";
import {PracticeActions, PracticeState} from "../../types";
import React from "react";
import connect from "./connect";
import {WithStyles} from "@mui/styles";
import Button from "@mui/material/Button";


// @ts-ignore
import rawFile from '../../template-practice.docx'
import {PracticeFields, PracticeTypes} from "../../enum";
import {
    LANGUAGES,
    PRACTICE_FORMATS,
    PRACTICE_KINDS,
    PRACTICE_TYPES,
    PRACTICE_WAYS,
    QUALIFICATIONS
} from "../../constants";

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
            [PracticeFields.FEATURES_CONTENT_AND_INTERNSHIP]:
                this.multilineToList(fields[PracticeFields.FEATURES_CONTENT_AND_INTERNSHIP]),
            [PracticeFields.FEATURES_INTERNSHIP]:
                this.multilineToList(fields[PracticeFields.FEATURES_INTERNSHIP]),
            [PracticeFields.ADDITIONAL_REPORTING_MATERIALS]:
                this.multilineToList(fields[PracticeFields.ADDITIONAL_REPORTING_MATERIALS]),
        }
    }


    multilineToList = (str: string) => {
        if (!str || str.length === 0) return [];
        return str.split(/\r?\n/g);
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
        const report = await createReport({
            template,
            data: {...preparedFields},
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
            'work-program-practice.docx',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        );
    };

    sendToIsu = () => {
        this.props.actions.sendToIsu();
    };

    render() {
        const {classes, fields} = this.props;
        const canSendToIsu = fields.can_send_to_isu;

        return (
            <div className={classes.wrapper}>
                {
                    canSendToIsu && <Button variant='outlined'
                                            className={classes.marginRight}
                                            onClick={this.sendToIsu}>
                        Отправить в ИСУ
                    </Button>
                }
                <Button variant='outlined'
                        className={classes.input}
                        onClick={this.handleDownload(fields)}>
                    Скачать практику
                </Button>
            </div>
        );
    }
}

export default connect(withStyles(styles)(Download));
