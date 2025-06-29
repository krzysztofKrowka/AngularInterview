import { inject, Injectable } from "@angular/core";
import { EditType, ELEMENT_DATA, PeriodicElement } from "./data";

@Injectable({
  providedIn:"root"
})
export class PeriodicTableService{
  async getAll (){
    await sleep(500)
    return ELEMENT_DATA
  }
  async editElement(element:PeriodicElement,value:string,type:EditType){
      await sleep(500)
      if(type == "position")
        element.position = parseInt(value)
      if(type == "name")
        element.name = value
      if(type == "weight")
        element.weight = parseFloat(value)
      if(type == "symbol")
        element.symbol = value
      return element

  }
}

async function sleep(ms:number){
  return new Promise(result =>{
    setTimeout(result,ms);
  })
}
