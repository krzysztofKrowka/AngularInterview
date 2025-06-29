export const ELEMENT_DATA: PeriodicElement[] = [

  {id:1, position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H',load:true},

  {id:2, position: 2, name: 'Helium', weight: 4.0026, symbol: 'He',load:true},

  {id:3, position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li',load:true},

  {id:4, position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be',load:true},

  {id:5, position: 5, name: 'Boron', weight: 10.811, symbol: 'B',load:true},

  {id:6, position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C',load:true},

  {id:7, position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N',load:true},

  {id:8, position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O',load:true},

  {id:9, position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F',load:true},

  {id:10, position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne',load:true},

  ];

export type PeriodicElement = {
    id: number;
    position:number;
    name:string;
    weight:number;
    symbol:string;
    load:boolean;
  }

export  interface DialogData {
    value: string;
    type: string;
    element: PeriodicElement
  }

export type EditType = "position" | "name" | "weight" | "symbol"
