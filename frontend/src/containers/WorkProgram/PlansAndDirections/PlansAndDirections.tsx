import React from 'react';
import Scrollbars from "react-custom-scrollbars";
import {Link} from "react-router-dom";

import withStyles from '@material-ui/core/styles/withStyles';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import DownloadIcon from "@material-ui/icons/CloudDownloadOutlined";

import {PlansAndDirectionsProps} from './types';
import Service from '../service'
import {appRouter} from '../../../service/router-service';

import connect from './PlansAndDirections.connect';
import styles from './PlansAndDirections.styles';

const service = new Service()

class PlansAndDirections extends React.PureComponent<PlansAndDirectionsProps> {
  handleDownload = ({opId, planId, year}: any) => {
    const fileLink = service.getDownloadFileLink({
      wpId: this.props.wpId,
      directionId: opId,
      planId: planId,
      year,
    });

    let tempLink = document.createElement('a');

    tempLink.href = fileLink;

    tempLink.setAttribute('target', '_blank');

    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  }

  render() {
    const {classes, plans} = this.props;

    return (
      <div className={classes.root}>
        <Scrollbars style={{height: 'calc(100vh - 400px)'}}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell className={classes.header}>Наименования модуля</TableCell>
                <TableCell className={classes.header}>id модуля</TableCell>
                <TableCell className={classes.header}>Образовательные программы</TableCell>
                <TableCell className={classes.header}>Направления</TableCell>
                <TableCell className={classes.header}>Год набора</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {plans.map((plan) => {
                const opList = plan?.discipline_block_module?.descipline_block;

                if (opList.length === 0) {
                  return (
                    <TableRow>
                      <TableCell>
                        {plan?.discipline_block_module?.name}
                      </TableCell>
                      <TableCell>
                        {plan?.discipline_block_module?.id}
                      </TableCell>
                      <TableCell />
                      <TableCell />
                      <TableCell />
                      <TableCell />
                    </TableRow>
                  )
                }

                return (
                  <>
                    {opList.map((opItem: any, index: number) => (
                      <TableRow>
                        {index === 0 ?
                          <>
                            <TableCell rowSpan={opList.length}>
                              <Link
                                to={appRouter.getTrainingModuleDetailLink(plan?.discipline_block_module?.id)}
                                target="_blank"
                                className={classes.cellLink}
                              >
                                {plan?.discipline_block_module?.name}
                              </Link>
                            </TableCell>
                            <TableCell rowSpan={opList.length}>
                              {plan?.discipline_block_module?.id}
                            </TableCell>
                          </>
                          : null
                        }
                        <TableCell>
                          <Link
                            to={appRouter.getPlanDetailLink(opItem?.academic_plan?.id)}
                            target="_blank"
                            className={classes.cellLink}
                          >
                            {opItem?.academic_plan?.academic_plan_in_field_of_study[0]?.title}
                          </Link>
                        </TableCell>
                        <TableCell>
                          {opItem?.academic_plan?.academic_plan_in_field_of_study[0]?.field_of_study[0]?.title}
                        </TableCell>
                        <TableCell >
                          {opItem?.academic_plan?.academic_plan_in_field_of_study[0]?.year}
                        </TableCell>
                        <TableCell>
                          <DownloadIcon
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              this.handleDownload({
                                year: opItem?.academic_plan?.academic_plan_in_field_of_study[0]?.year,
                                opId: opItem?.academic_plan?.academic_plan_in_field_of_study[0]?.field_of_study[0]?.id,
                                planId: opItem?.academic_plan?.id,
                              })
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                )
              })}
            </TableBody>
          </Table>
        </Scrollbars>
      </div>
    );
  }
}

export default connect(withStyles(styles)(PlansAndDirections));
