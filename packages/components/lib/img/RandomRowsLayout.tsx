// @ts-ignore
import classnames from "classnames";
import React from "react";

const last = <T extends any>(arr: T[]): T => {
  if (arr.length < 2) {
    return arr[0];
  }

  return arr[arr.length - 1];
};

const defaultCellClsGenerator = (
  colNum: number,
  isCenterSingleCell: boolean
) => {
  const isSingleCell = colNum === 1;
  const singleCellWidth = isCenterSingleCell ? "full" : "1/2";
  const cellWidth = isSingleCell ? singleCellWidth : "1/2";

  return `md:basis-${cellWidth}`;
};

export const generateRandomBoolean = (p: number = 0.5): boolean =>
  Math.random() < p;

const generateRandomColNum = (total: number): number[] => {
  const colNumArr = [];
  if (total <= 2) {
    return [total];
  }

  let colSum = 0;
  while (colSum < total) {
    const p: number = last<number>(colNumArr) === 2 ? 0.9 : 0.5;
    const num = generateRandomBoolean(p) ? 1 : 2;
    colNumArr.push(num);
    colSum += num;
  }
  return colNumArr;
};

export interface RandomRowsLayoutProps {
  classNames?: string;
  cellWrapperClsGenerator?: (colNum: number, randBoolean: boolean) => string;
  cellsCount: number;
  cellRenderer: (
    index: number,
    randomBool: boolean,
    col: number
  ) => React.ReactNode;
}

const sumColNumByIdx = (colNums: number[], idx: number): number => {
  let sum = 0;
  for (let i = 0; i < idx; i++) {
    sum += colNums[i];
  }
  return sum;
};

export const RandomRowsLayout = React.memo(
  (props: RandomRowsLayoutProps) => {
    const {
      cellsCount,
      cellRenderer,
      classNames = "",
      cellWrapperClsGenerator = defaultCellClsGenerator,
    } = props;
    const colNums = generateRandomColNum(cellsCount);

    return (
      <div className={classNames}>
        {colNums.map((colNum, row) => {
          const randBool = generateRandomBoolean(
            colNum < 2 ? 0.6 : 0.5 /* 增加单列大图概率 */
          );
          const randBoolArr = [randBool, !randBool];
          return (
            <div className="flex items-center flex-wrap" key={row}>
              {new Array(colNum).fill(null).map((_, col) => {
                const generatedCls = cellWrapperClsGenerator(
                  colNum,
                  generateRandomBoolean()
                );

                const currentIdx = sumColNumByIdx(colNums, row) + col;

                const cls = classnames(
                  "flex items-center justify-center flex-shrink-0 flex-grow-0",
                  "basis-full",
                  generatedCls
                );
                return (
                  <div className={cls} key={col}>
                    {cellRenderer(currentIdx, randBoolArr[col], col)}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.cellsCount === nextProps.cellsCount;
  }
);
