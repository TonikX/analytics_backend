import React from 'react'
import get from 'lodash/get';
import {Link} from "react-router-dom";

import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";

import {appRouter} from "../../../../service/router-service";

import {CompetenceTableType} from "../../enum";

import {CompetenceTableProps} from './types';

import useStyles from './CompetencesTable.style';

export const CompetenceTable: React.FC<CompetenceTableProps> = ({competenceTableType, tableData}) => {
  const classes = useStyles();

  const getCompetenceField = (): string => {
    switch (competenceTableType){
      case CompetenceTableType.GENERAL_PROFESSIONAL_COMPETENCES:
        return 'competence_in_group_of_general_prof_competences'
      case CompetenceTableType.KEY_COMPETENCES:
        return 'competence_in_group_of_key_competences';
      case CompetenceTableType.SUPRA_PROFESSIONAL_COMPETENCES:
        return 'competence_in_group_of_over_prof_competences';
      default:
        return '';
    }
  }
  const getIndicatorField = (): string => {
    switch (competenceTableType){
      case CompetenceTableType.GENERAL_PROFESSIONAL_COMPETENCES:
        return 'indicator_of_competence_in_group_of_general_prof_competences'
      case CompetenceTableType.KEY_COMPETENCES:
        return 'indicator_of_competence_in_group_of_key_competences';
      case CompetenceTableType.SUPRA_PROFESSIONAL_COMPETENCES:
        return 'indicator_of_competence_in_group_of_over_prof_competences';
      default:
        return '';
    }
  }

  return (
    <div className={classes.root}>
      <Table stickyHeader size='small'>
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell className={classes.categoryCell}>
              Категория компетенций
            </TableCell>
            <TableCell className={classes.competenceCell}>
              Код и название компетенции
            </TableCell>
            <TableCell>
              Индикаторы
            </TableCell>
            <TableCell>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((item: any) => {
            const competences = get(item, getCompetenceField(), []);

            if (competences.length === 0){
              return (
                <TableRow key={`item-${item.id}`}>
                  <TableCell className={classes.categoryCell}>
                    {get(item, 'name')}
                  </TableCell>
                  <TableCell className={classes.competenceCell}>

                  </TableCell>
                  <TableCell />
                  <TableCell />
                </TableRow>
              )
            }

            return competences.map((competenceItem: any, competenceIndex: number) => (
              <TableRow key={`competence-${get(competenceItem, 'competence.id')}`}>
                {competenceIndex === 0 &&
                  <TableCell rowSpan={competences.length} className={classes.categoryCell}>
                    {get(item, 'name')}
                  </TableCell>
                }
                <TableCell className={classes.competenceCell}>
                  <Link
                    to={appRouter.getCompetenceIndicatorsRouteLink(get(competenceItem, 'competence.id'))}
                    target="_blank"
                    className={classes.link}
                  >
                    {get(competenceItem, 'competence.number')} {get(competenceItem, 'competence.name')}
                  </Link>
                </TableCell>
                <TableCell>
                  {get(competenceItem, getIndicatorField()).map((indicatorItem: any) => (
                    <div key={indicatorItem.id}>
                      {get(indicatorItem, 'indicator.number')} {get(indicatorItem, 'indicator.name')}
                    </div>
                  ))}
                </TableCell>
                <TableCell className={classes.actions}>
                </TableCell>
              </TableRow>
            ));
          })}
        </TableBody>
      </Table>
    </div>
  )
};
