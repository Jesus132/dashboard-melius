import { NumberSymbol } from '@angular/common';
import { ApexOptions } from './Apexchart.interface';

export interface Widgets {
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    i?: NumberSymbol,
    ChartBackend?: string,
    chartOptions?: ApexOptions,
}