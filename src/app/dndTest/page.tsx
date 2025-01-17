'use client'
 // /* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { memo, useCallback, useState } from 'react'
import { useDrop } from 'react-dnd'
import { DnDFormGroupTypes } from '@app/types'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper'

import './dndTest.scss'

interface IDragonDropGrid {
  children?: React.ReactNode
};
interface IDragonDropGridContainer {
  children?: React.ReactNode
  col: number;
  row: number;
};

interface IDragonDropGridCanvas {
  children?: React.ReactNode
  width: number | string;
  height: number | string;
};
const config = { col: 3, row: 3, width: '550px', height: '100%' };
const GridStyle = () => {
  return (<>
    <style>
      {`
        .container {
          width: 550px;
          height: 100%;
          display: flex;
          flex-direction: column;
          margin: 3rem auto;
        }
        .grid-container {
          display: GridCanvas; 
          grid-template-columns: repeat(${config.col}, 1fr); 
          grid-template-rows: repeat(${config.row}, 1fr);
          grid-gap: 2;
          grid-auto-flow: row dense;
        }
        .grid-row {
          display: flex;
          flex-direction: row;
          width: 100%;
          height: 100%;
          grid-area: span 1/span 1;
        }
        .grid-item {
          width: 100%;
          height: 100%;
          border: 1px solid #000;
        }
      `}
    </style>
  </>)
}

const GridCanvas = ({ children, width, height }: IDragonDropGridCanvas) => {
  return (<>
    <div className="container p-0 m-0">
      {children}
    </div>
  </>)
}


const GridRow = ({ children }: { children: React.ReactNode }) => (
  <div className="hs-formbuilder-grid-row">{children}</div>
);

const GridItem = () => <div className="hs-formbuilder-grid-item"></div>;

const GridContainer = ({ children, col, row }: IDragonDropGridContainer) => {
  const gridColumns = Array.from({ length: col });
  const gridRows = Array.from({ length: row });
  const [dndFormGroups, setDnDFormGroups] = useState(DnDFormGroupTypes)

  const findDnDFormGroup = useCallback(
    (id: string) => {
      const dndFormGroup = dndFormGroups.filter((fg) => `${fg.id}` === id)[0] as {
        id: number
        text: string
      }
      return {
        dndFormGroup,
        index: dndFormGroups.indexOf(dndFormGroup),
      }
    },
    [dndFormGroups],
  )

  const moveDnDFormGroup = useCallback(
    (id: string, atIndex: number) => {
      const { dndFormGroup, index } = findDnDFormGroup(id)
      setDnDFormGroups(
        update(dndFormGroups, {
          $splice: [
            [index, 1],
            [atIndex, 0, dndFormGroup],
          ],
        }),
      )
    },
    [findDnDFormGroup, dndFormGroups, setDnDFormGroups],
  )

  const [, drop] = useDrop(() => ({ accept: DnDFormGroupTypes.DNDFORMGROUP }))

  function toolsSubmitHandler(event: React.FormEvent) {
    event.preventDefault();
    console.log('toolsSubmitHandler');
  }

  return (
    <>
      <div className="hs-tools">
        <form onSubmit={void(0)} className="hs-tools-form">

          <div class="hs-tool-grid-container">
            <div class="hs-tool-grid-columns">
              <div className="form-group align-items-center text-center px-3 justify-content-center">
                <label htmlFor="chooseColumns" classNamew="form-label">Columns</label>
                <input id="chooseColumns" minLength="4" maxLength="8" size="15" className="form-control" type="number"  placeholder="3" />
              </div>
            </div>
            <div class="hs-tool-grid-rows">
              <div className="form-group align-items-center text-center px-3 justify-content-center">
                <label htmlFor="chooseRows" classNamew="form-label">Rows</label>
                <input id="chooseRows" minLength="4" maxLength="8" size="15" className="form-control" type="number"  placeholder="3"  />
              </div>
            </div>
            <div class="hs-tool-grid-width">
              <div className="form-group align-items-center px-3 justify-content-center text-center">
                <label htmlFor="width" classNamew="form-label">Width</label>
                <input id="width" type="text" minLength="1" maxLength="8" size="15" className="form-control" placeholder="100%" />
              </div>
            </div>
            <div class="hs-tool-grid-height">
              <div className="form-group align-items-center text-center px-3 justify-content-center">
                <label htmlFor="height" classNamew="form-label">Height</label>
                <input id="height" type="text" minLength="1" maxLength="8" size="15" className="form-control" placeholder="100%" />
              </div>
            </div>
            <div class="hs-tool-grid-button px-3 justify-content-center d-inline-flex align-items-end">
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </div>
        </form>
      </div>
      <div className="container pt-3" style={{maxWidth: '75%'}}>
        <GridCanvas width={config.width} height={config.height}>
          <div className="hs-formbuilder-grid-container">
            {gridRows.map((_, rowIndex) => (
              <GridRow key={`row-${rowIndex}`}>
                {gridColumns.map((_, colIndex) => (
                  <GridItem key={`col-${colIndex}`}
                  id={`col-${colIndex}`}
                  text={'temp placeholder'}
                  moveDnDFormGroup={moveDnDFormGroup}
                  findDnDFormGroup={findDnDFormGroup}
                  />
                ))}
              </GridRow>
            ))}
          </div>
        </GridCanvas>
      </div>
    </>
  );
};


const DragonDropGrid = ({ children }: IDragonDropGrid) => {
  return (<>
    <GridCanvas width={config.width} height={config.height}>
      <DndProvider backend={HTML5Backend}>
        <GridContainer col={config.col} row={config.row} />
      </DndProvider>
    </GridCanvas>
    {children}
  </>)
}
export default DragonDropGrid

