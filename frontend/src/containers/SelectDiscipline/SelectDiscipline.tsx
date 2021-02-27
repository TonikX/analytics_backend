import React from 'react';

// @ts-ignore
import matchSorter from 'match-sorter';
import {Link} from "react-router-dom";
import {List, AutoSizer} from 'react-virtualized';
import Scrollbars from "react-custom-scrollbars";

import className from "classnames";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import IconButton from "@material-ui/core/IconButton";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";
import CancelOutlined from "@material-ui/icons/CancelOutlined";
import withStyles from '@material-ui/core/styles/withStyles';

import TextField from '../../components/TextField';

import {appRouter} from "../../service/router-service";

import {SelectDisciplineProps, WorkProgramType} from './types';
import {qualificationEnum, workProgramFields} from './enum';

import connect from './SelectDiscipline.connect';
import styles from './SelectDiscipline.styles';

class SelectDiscipline extends React.Component<SelectDisciplineProps> {
    state = {
        scrollTop: 0,
        searchQuery: ''
    }

    handleChangeQualification = (value: string) => () => {
        const {semester} = this.props;

        this.props.actions.selectQualification(value);

        if (value === qualificationEnum.MASTER && semester > 4){
            this.props.actions.selectSemester(4);
        }
    }

    handleChangeSemester = (e: React.ChangeEvent<{}>, value: number | number[]) => {
        this.props.actions.selectSemester(value);
    }

    handleSearchKeys = () => {
        this.props.actions.selectDisciplineGetKeywords();
    }

    addKeyword = (keyword: string) => () => {
        this.props.actions.selectDisciplineSelectKeyword(keyword);
    }

    removeKeyword = (keyword: string) => () => {
        this.props.actions.selectDisciplineUnselectKeyword(keyword);
    }

    handleGetWorkPrograms = () => {
        this.props.actions.selectDisciplineGetWorkPrograms();
    }

    rowRenderer = ({key, index, style}: any)  => {
        const {classes} = this.props;
        const searchedKeywords = this.getSearchedKeywords();

        const keyword = searchedKeywords[index];

        return (
            <div key={key}
                 style={style}
                 className={classes.keywordListItem}
                 onClick={this.addKeyword(keyword)}
            >
                <Typography className={classes.keywordTitle}> {this.getFormattedKeyword(keyword)} </Typography>
                <IconButton className={classes.iconButton}>
                    <CheckCircleOutline className={classes.addIcon} />
                </IconButton>
            </div>
        );
    }

    getFormattedKeyword = (keyword: string) => keyword.replace(/_/g, ' ');

    handleScroll = ({ target: { scrollTop } }: any) => {
        this.setState({scrollTop});
    }

    generateMarks = () => {
        const {qualification} = this.props;
        const marks = new Array(qualification === qualificationEnum.MASTER ? 4 : 8);

        return marks.map((item, index) => ({
            label: index.toString(),
            value: index
        }));
    }

    handleChangeSearch = (value: string) => {
        this.setState({searchQuery: value});
    }

    getSearchedKeywords = () => matchSorter(this.props.allKeywords, this.state.searchQuery, {threshold: matchSorter.rankings.CONTAINS});

    render() {
        const {classes, qualification, semester, allKeywords, selectedKeywords, workPrograms} = this.props;
        const {scrollTop} = this.state;
        const searchedKeywords = this.getSearchedKeywords();

        return (
            <Paper className={classes.root}>
                <Typography className={classes.title}>
                    Подбор дисциплин
                </Typography>

                <Typography className={classes.subtitle}>
                    1. Найдите ключевые слова
                </Typography>

                <div className={classes.row}>
                    <div>
                        <Typography>Квалификация: </Typography>
                        <ButtonGroup>
                            <Button onClick={this.handleChangeQualification(qualificationEnum.BACHELOR)}
                                    color={qualification === qualificationEnum.BACHELOR ? 'primary' : 'default'}
                                    variant="contained"
                                    className={className({[classes.whiteButton]: qualification !== qualificationEnum.BACHELOR})}
                            >
                                Бакалавр
                            </Button>
                            <Button onClick={this.handleChangeQualification(qualificationEnum.MASTER)}
                                    color={qualification === qualificationEnum.MASTER ? 'primary' : 'default'}
                                    variant="contained"
                                    className={className({[classes.whiteButton]: qualification !== qualificationEnum.MASTER})}
                            >
                                Магистр
                            </Button>
                        </ButtonGroup>
                    </div>
                    <div className={classes.sliderWrap}>
                        <Typography>Семестр: </Typography>

                        {/*<Slider*/}
                        {/*    defaultValue={1}*/}
                        {/*    getAriaValueText={valuetext}*/}
                        {/*    aria-labelledby="discrete-slider-always"*/}
                        {/*    step={1}*/}
                        {/*    marks={this.generateMarks()}*/}
                        {/*    valueLabelDisplay="on"*/}
                        {/*/>*/}
                        <Slider step={1}
                                min={1}
                                max={qualification === qualificationEnum.MASTER ? 4 : 8}
                                value={semester}
                                marks={this.generateMarks()}
                                onChange={this.handleChangeSemester}
                                valueLabelDisplay="on"
                        />
                    </div>
                    <Button variant="outlined"
                            color="primary"
                            onClick={this.handleSearchKeys}
                            className={classes.searchKeysButton}
                    >
                        Найти ключевые слова
                    </Button>
                </div>


                {allKeywords.length > 0 &&
                    <>
                        <Typography className={classes.subtitle}>
                            2. Выберите ключевые слова
                        </Typography>

                        <div className={classes.keywordsLists}>
                            <div className={classes.allKeywordsList}>
                                <TextField onChange={this.handleChangeSearch}
                                           label="Поиск"
                                />

                                <AutoSizer>
                                    {({height, width}: any): React.ReactElement => (
                                        <div style={{height: height - 80, width}}>
                                            <Scrollbars height={height - 80}
                                                        width={width}
                                                        onScroll={this.handleScroll}
                                            >
                                                <List
                                                    width={width}
                                                    height={height - 80}
                                                    rowCount={searchedKeywords.length}
                                                    rowHeight={30}
                                                    rowRenderer={this.rowRenderer}
                                                    scrollTop={scrollTop}
                                                    autoHeight
                                                />
                                            </Scrollbars>
                                        </div>
                                    )}
                                </AutoSizer>
                            </div>

                            <div className={classes.selectedKeywordsList}>
                                <AutoSizer>
                                    {({height, width}: any): React.ReactElement => (
                                        <div style={{width, height}}>
                                            <Scrollbars height={height}
                                                        width={width}
                                            >
                                                {selectedKeywords.map((item: string) =>
                                                        <div key={item}
                                                             className={classes.keywordListItem}
                                                             onClick={this.removeKeyword(item)}
                                                        >
                                                            <Typography> {this.getFormattedKeyword(item)} </Typography>
                                                            <IconButton className={classes.iconButton}>
                                                                <CancelOutlined className={classes.removeIcon} />
                                                            </IconButton>
                                                        </div>
                                                )}
                                            </Scrollbars>
                                        </div>
                                    )}
                                </AutoSizer>
                            </div>
                        </div>

                        <Button variant="outlined"
                                color="primary"
                                onClick={this.handleGetWorkPrograms}
                                className={classes.getWPButton}
                                disabled={!selectedKeywords.length}
                        >
                            Подобрать программы
                        </Button>
                    </>
                }
                {workPrograms.length > 0 &&
                    <>
                        <Typography className={classes.subtitle}>
                            3. Просмотрите подобранные дисциплины для вас
                        </Typography>
                        <div>
                            {workPrograms.map((item: WorkProgramType) =>
                                <Link className={classes.wp}
                                      to={appRouter.getWorkProgramLink(item[workProgramFields.ID])}
                                      target="_blank"
                                >
                                    <Typography className={classes.wpCode}>{item[workProgramFields.ID]}</Typography>
                                    <Typography> {item[workProgramFields.TITLE]} </Typography>
                                </Link>
                            )}
                        </div>
                    </>
                }
            </Paper>
        );
    }
}

export default connect(withStyles(styles)(SelectDiscipline));
