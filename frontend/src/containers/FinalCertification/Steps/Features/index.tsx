import React from "react";
import {
    CertificationFields,
    CertificationSteps,
    OptionalRequirements,
    OptionalRequirementsRussian, TemplateTextCertificationFields
} from "../../enum";
import get from "lodash/get";
import connect from "./connect";
import {WithStyles, withStyles} from "@mui/styles";
import styles from "../styles";
import {Checkbox, FormControlLabel, FormGroup, FormLabel, Typography} from "@mui/material";
import {CertificationActions, CertificationState, TemplateTextState} from "../../types";
import Input from "../../components/Input";
import {shallowEqualObjects} from "shallow-equal";
import Scrollbars from "react-custom-scrollbars-2";

interface FeaturesProps extends WithStyles<typeof styles> {
    actions: CertificationActions;
    fields: CertificationState;
    templateText: TemplateTextState;
}

class Features extends React.Component<FeaturesProps> {

    state = {
        optionalRequirements: {
            [OptionalRequirements.ACRONYMS]: false,
            [OptionalRequirements.DEFINITIONS]: false,
            [OptionalRequirements.ILLUSTRATIONS]: false,
            [OptionalRequirements.APPENDIX]: false,
        },
    }

    componentDidMount() {
        this.setRequirements();
    }

    setRequirements = () => {
        const requirements = this.props.fields[CertificationFields.STRUCTURE_ELEMENTS_OPTIONAL]
            .split(';')
            .map(str => str.toLowerCase());

        const reqs: any = {};

        for (const requirement of requirements) {
            for (const [field, russianName] of Array.from(OptionalRequirementsRussian.entries())) {
                if (russianName.toLowerCase() === requirement) {
                    reqs[field] = true;
                }
            }
        }
        this.setState({
            ...this.state,
            optionalRequirements: {
                ...this.state.optionalRequirements,
                ...reqs,
            }
        });
    }

    componentDidUpdate(prevProps: Readonly<FeaturesProps>, prevState: Readonly<{}>, snapshot?: any) {
        const {fields} = this.props;

        if (shallowEqualObjects(fields, prevProps.fields)) {
            return;
        }

        this.setRequirements();
    }

    saveField = (field: string) => (e: React.ChangeEvent) => {
        const value = get(e, 'target.value')

        this.props.actions.setField({field, value});
    }

    handleChangeCheckbox = (field: OptionalRequirements) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        const state = {
            ...this.state,
            optionalRequirements: {
                ...this.state.optionalRequirements,
                [field]: checked,
            }
        };
        this.setState(state);

        const options: any = state.optionalRequirements;

        const value = Object.keys(options)
            .filter(field => !!(options[field]))
            .map(field => OptionalRequirementsRussian.get(field))
            .join(';')

        this.props.actions.saveField({field: CertificationFields.STRUCTURE_ELEMENTS_OPTIONAL, value});
    };

    render() {

        const {classes, templateText} = this.props;

        const requirements = this.state.optionalRequirements;

        return (
            <div className={classes.content}>
                <Scrollbars>
                    <Typography variant='h5'>
                        {CertificationSteps.FEATURES}
                    </Typography>

                    <div className={classes.columns}>
                        <div className={classes.singleColumn}>
                            <Input fieldName={CertificationFields.PRELIMINARY_DEFENSE}/>
                            <Input fieldName={CertificationFields.ANTI_PLAGIARISM}/>
                            <Typography style={{marginTop: '30px'}} align="justify">
                                {templateText[TemplateTextCertificationFields.STRUCTURE_ELEMENTS]}
                            </Typography>
                            <FormGroup className={classes.optionalRequirements}>
                                <FormLabel component="legend">Опциональные требования к оформлению ВКР</FormLabel>
                                <FormControlLabel
                                    control={<Checkbox checked={requirements[OptionalRequirements.ACRONYMS]}
                                                       onChange={this.handleChangeCheckbox(OptionalRequirements.ACRONYMS)}
                                                       size='small'/>}
                                    label={OptionalRequirementsRussian.get(OptionalRequirements.ACRONYMS)}/>
                                <FormControlLabel
                                    control={<Checkbox checked={requirements[OptionalRequirements.DEFINITIONS]}
                                                       onChange={this.handleChangeCheckbox(OptionalRequirements.DEFINITIONS)}
                                                       size='small'/>}
                                    label={OptionalRequirementsRussian.get(OptionalRequirements.DEFINITIONS)}/>
                                <FormControlLabel
                                    control={<Checkbox checked={requirements[OptionalRequirements.ILLUSTRATIONS]}
                                                       onChange={this.handleChangeCheckbox(OptionalRequirements.ILLUSTRATIONS)}
                                                       size='small'/>}
                                    label={OptionalRequirementsRussian.get(OptionalRequirements.ILLUSTRATIONS)}/>
                                <FormControlLabel
                                    control={<Checkbox checked={requirements[OptionalRequirements.APPENDIX]}
                                                       onChange={this.handleChangeCheckbox(OptionalRequirements.APPENDIX)}
                                                       size='small'/>}
                                    label={OptionalRequirementsRussian.get(OptionalRequirements.APPENDIX)}/>
                            </FormGroup>
                            <Input fieldName={CertificationFields.OPTIONAL_DESIGN_REQUIREMENTS}/>
                            <Input fieldName={CertificationFields.CONTENT_REQUIREMENTS}/>
                            <Input fieldName={CertificationFields.DEFENCE_PRESENTATION_REQUIREMENTS}/>
                        </div>
                    </div>
                </Scrollbars>
            </div>
        );
    }
}

export default connect(withStyles(styles)(Features));