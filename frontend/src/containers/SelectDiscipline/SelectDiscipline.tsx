import React from 'react';

// @ts-ignore
import matchSorter from 'match-sorter';
import {Link} from "react-router-dom";
import {List, AutoSizer, CellMeasurer, CellMeasurerCache} from 'react-virtualized-reactv17';
import Scrollbars from "react-custom-scrollbars-2";

import className from "classnames";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import IconButton from "@mui/material/IconButton";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";
import CancelOutlined from "@mui/icons-material/CancelOutlined";
import {withStyles} from '@mui/styles';

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
    cache = new CellMeasurerCache({
        fixedWidth: true,
        defaultHeight: 30,
    })

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
        // необходимо чтобы избежать подергивание списка
        const rows = this.getSearchedKeywords()
        const index = rows.indexOf(keyword)

        this.props.actions.selectDisciplineSelectKeyword(keyword);

        // необходимо чтобы избежать подергивание списка
        const afterRows = rows.filter((keyword: string) => rows.indexOf(keyword) >= index )
        const afterRowsIndexes = afterRows.map((keyword: string) => rows.indexOf(keyword))
        afterRowsIndexes.forEach((index: number) => this.cache.clear(index, 0))
    }

    removeKeyword = (keyword: string) => () => {
        this.props.actions.selectDisciplineUnselectKeyword(keyword);
        this.cache.clearAll()
    }

    handleGetWorkPrograms = () => {
        this.props.actions.selectDisciplineGetWorkPrograms();
    }

    rowRenderer = ({key, parent, index, style}: any)  => {
        const {classes} = this.props;
        const searchedKeywords = this.getSearchedKeywords();

        const keyword = searchedKeywords[index];

        return (
            <CellMeasurer
                key={key}
                cache={this.cache}
                parent={parent}
                columnIndex={0}
                rowIndex={index}
            >
                <div
                    style={style}
                    className={classes.keywordListItem}
                    onClick={this.addKeyword(keyword)}
                >
                    <Typography className={classes.keywordTitle}> {this.getFormattedKeyword(keyword)} </Typography>
                    <IconButton className={classes.iconButton}>
                        <CheckCircleOutline className={classes.addIcon} />
                    </IconButton>
                </div>
            </CellMeasurer>
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
        //@ts-ignore
        const {classes} = this.props;
        const {qualification, semester, allKeywords, selectedKeywords, workPrograms} = this.props;
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
                        <Typography>Уровень образования: </Typography>
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
                                                    rowHeight={this.cache.rowHeight}
                                                    rowRenderer={this.rowRenderer}
                                                    deferredMeasurementCache={this.cache}
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
