/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import * as React from 'react';
import { memo, useCallback, useState } from 'react'
import { useDrop } from 'react-dnd'
import { DnDFormGroupTypes } from '@app/types'
// import { DndProvider } from 'react-dnd'
// import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper'
import './GridParts.scss';


interface GridPartsProps {
  children: React.ReactNode
};
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
  width?: number | string;
  height?: number | string;
};
export const config = { col: 1, row: 4, width: '100%', height: '100%' };

const css = {
  hsFormbuilderGrid: {
      /*display: 'grid',
      gridTemplateColumns: `repeat(${config.col}, 1fr)`,
      gridTemplateRows: `repeat(${config.row}, 1fr)`,
      gridGap: '1rem', */
      display: 'flex',
      marginTop: '1rem', 
      color: 'var(--text-color)',
      backgroundColor: 'var(--background-color)',
      maxWidth: '100%',
      height: '100vh',
      height: '100%',
    },
      hsFormbuilderGridRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'center',
        padding: 0,
        margin: 0,
        width: '100%',
        boxSizing: 'border-box',
      },
      hsFormbuilderGridItem: {
        display: 'inline-flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
        border: '1px solid #ccc',
        backgroundColor: '#191919',
        boxSizing: 'border-box',
      },
        hsFormbuilderGridCanvas: {
          padding: '2rem',
          margin: 'auto',
        },
      hsFormbuilderGridFormgroup: {
        color: 'var(--text-color)',
      }
   
  }


export const GridParts = ({ children }: GridPartsProps) => {
  return (
    <>
      {children}
    </>
  );
};

export const GridCanvas = ({ children }: IDragonDropGridCanvas) => {
  return (<>
    <div className="container hs-formbuilder-grid-canvas p-0 m-0" style={css.hsFormbuilderGridCanvas}> 
      {children}
    </div>
  </>)
}


export const GridRow = ({ children }: { children: React.ReactNode }) => (
  <div className="hs-formbuilder-grid-row" style={css.hsFormbuilderGridRow}>{children}</div>
);

export const GridItem = ({ children }: GridPartsProps) => <div className="hs-formbuilder-grid-item" style={css.hsFormbuilderGridItem}>{children}</div>;

export const GridContainer = ({ children, col, row }: IDragonDropGridContainer) => {
  const gridColumns = Array.from({ length: col });
  const gridRows = Array.from({ length: row });
  const [ dndFormGroups, setDnDFormGroups ] = useState(DnDFormGroupTypes)

  const findDnDFormGroup = useCallback(
    (id: string) => {
      const dndFormGroup = dndFormGroups.filter((fg) => `${fg.id}` === id)[ 0 ] as {
        id: number
        text: string
      }
      return {
        dndFormGroup,
        index: dndFormGroups.indexOf(dndFormGroup),
      }
    },
    [ dndFormGroups ],
  )

  const moveDnDFormGroup = useCallback(
    (id: string, atIndex: number) => {
      const { dndFormGroup, index } = findDnDFormGroup(id)
      setDnDFormGroups(
        update(dndFormGroups, {
          $splice: [
            [ index, 1 ],
            [ atIndex, 0, dndFormGroup ],
          ],
        }),
      )
    },
    [ findDnDFormGroup, dndFormGroups, setDnDFormGroups ],
  )

  const [ , drop ] = useDrop(() => ({ accept: DnDFormGroupTypes.DNDFORMGROUP }))



  return (
    <>
      
      <GridCanvas width={config.width} height={config.height} >
        <div className="hs-formbuilder-grid pt-3" style={css.hsFormbuilderGrid}>
          {children}
        </div>
      </GridCanvas>
    </>
  );
};
export default GridContainer;

export const Tools = () => {

  function toolsSubmitHandler(event: React.FormEvent) {
    event.preventDefault();
    console.log('toolsSubmitHandler');
  }

  return (
    <div className="hs-tools">
      <form onSubmit={void (0)} className="hs-tools-form">

        <div class="hs-tool-grid-container">
          <div class="hs-tool-grid-columns">
            <div className="form-group align-items-center text-center px-3 justify-content-center">
              <label htmlFor="chooseColumns" classNamew="form-label">Columns</label>
              <input id="chooseColumns" minLength="4" maxLength="8" size="15" className="form-control" type="number" placeholder="3" />
            </div>
          </div>
          <div class="hs-tool-grid-rows">
            <div className="form-group align-items-center text-center px-3 justify-content-center">
              <label htmlFor="chooseRows" classNamew="form-label">Rows</label>
              <input id="chooseRows" minLength="4" maxLength="8" size="15" className="form-control" type="number" placeholder="3" />
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
  )
}
