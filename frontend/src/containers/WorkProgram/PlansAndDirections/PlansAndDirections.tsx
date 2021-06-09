import React from 'react';
import get from 'lodash/get';

import Scrollbars from "react-custom-scrollbars";

import {Link} from "react-router-dom";

import withStyles from '@material-ui/core/styles/withStyles';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import TableBody from "@material-ui/core/TableBody";
import {PlansAndDirectionsProps} from './types';
import {appRouter} from "../../../service/router-service";

import connect from './PlansAndDirections.connect';
import styles from './PlansAndDirections.styles';

class PlansAndDirections extends React.PureComponent<PlansAndDirectionsProps> {
    scrollBar: any = null;

    render() {
        const {classes, plans} = this.props;

        return (
            <div className={classes.root}>
                <Scrollbars style={{height: 'calc(100vh - 400px)'}} ref={(el) => {this.scrollBar = el}}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.header}>Образовательная программа</TableCell>
                                <TableCell className={classes.header}>Направление</TableCell>
                                <TableCell className={classes.header}>Год набора</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {plans.map(plan => {
                                const plans = get(plan, 'discipline_block_module.descipline_block', []);

                                return plans.map((plan: any) => (
                                    get(plan, 'academic_plan.academic_plan_in_field_of_study', []).map((item: any) => (
                                      <TableRow>
                                          <TableCell>
                                              <Link className={classes.link} target="_blank" to={appRouter.getPlanDetailLink(get(item, 'id'))}> {get(item, 'title', '')} </Link>
                                          </TableCell>
                                          <TableCell>
                                              {get(item, 'field_of_study', []).map((item: any) =>
                                                <>
                                                    {get(item, 'title', '')} ({get(item, 'number', '')}) <br/>
                                                </>
                                              )}
                                          </TableCell>
                                          <TableCell>
                                              {get(item, 'year', '')}
                                          </TableCell>
                                      </TableRow>
                                    ))
                                ))
                            })}
                        </TableBody>
                    </Table>
                </Scrollbars>
            </div>
        );
    }
}

export default connect(withStyles(styles)(PlansAndDirections));
