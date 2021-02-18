import React, {useState, useMemo} from 'react'
import debounce from "lodash/debounce";
//@ts-ignore
import matchSorter from 'match-sorter';

import {useStyles} from './ProfessionsSelectList.styles'

import {List, AutoSizer} from 'react-virtualized';
import Scrollbars from "react-custom-scrollbars";
import TextField from '../../../components/TextField';
import ProfessionItem from '../ProfessionItem/ProfessionItem'

import {ProfessionsSelectListProps} from './types'

const ProfessionsSelectList: React.FC<ProfessionsSelectListProps> = ({ professions, selectProfession, selectedProfessions, unselectProfession }) => {
  const classes = useStyles()
  const [scrollTop, setScrollTop] = useState<number>(0)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const handleScroll = ({ target: { scrollTop } }: any): void => {
    setScrollTop(scrollTop)
  }

  const searchedProfessions = useMemo(() => 
    matchSorter(professions, searchQuery, {keys: ['title']}), [searchQuery, professions])

  const rowRenderer = ({key, index, style}: any)  => {
    return (
      <ProfessionItem 
        key={key}
        style={style}
        mode='select'
        selectProfession={selectProfession}
        unselectProfession={unselectProfession}
        profession={searchedProfessions[index]}
      />
    );
  }

  const handleChangeSearch = (query: string): void => debounceSearch(query)

  const debounceSearch =  debounce((value: string): void => {
    setSearchQuery(value);
  }, 400);
  const selectedProfessionsList = selectedProfessions.map((p) => (
    <ProfessionItem
      key={p.id}
      mode='unselect'
      selectProfession={selectProfession}
      unselectProfession={unselectProfession}
      profession={p}
    />
  ))
  return (
    <div className={classes.professionsLists}>
      <div className={classes.allProfessionsList}>
        <TextField 
          onChange={handleChangeSearch}
          label="Поиск"
        />
        <AutoSizer>
          {({height, width}: any): React.ReactElement => (
            <div style={{height: height - 80, width}}>
              <Scrollbars 
                height={height - 80}
                width={width}
                onScroll={handleScroll}
              >
                <List
                    width={width}
                    height={height - 80}
                    rowCount={searchedProfessions.length}
                    rowHeight={30}
                    rowRenderer={rowRenderer}
                    scrollTop={scrollTop}
                    autoHeight
                />
              </Scrollbars>
            </div>
          )}
        </AutoSizer>
      </div>
      <div className={classes.selectedProfessionsList}>
        <AutoSizer>
          {({height, width}: any): React.ReactElement => (
            <div style={{height, width}}>
              <Scrollbars 
                height={height}
                width={width}
              >
                {selectedProfessionsList}
              </Scrollbars>
            </div>
          )}
        </AutoSizer>
      </div>
    </div>
  )
}

export default ProfessionsSelectList