import { inject, Injectable } from "@angular/core";
import { EditType, ELEMENT_DATA, PeriodicElement } from "./data";

@Injectable({
  providedIn:"root"
})
export class PeriodicTableService{
  async getElements (){
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
  async editFilter(filter:string,elements:PeriodicElement[]){
      elements.forEach(e =>{

        e.load = false
        for (const [key, value] of Object.entries(e)) {
          if(value.toString().includes(filter) && key != "load" && key != "id"){
            e.load = true
          }
        }
      })
      return elements.filter((e:PeriodicElement) => e.load)
  }
}

export async function sleep(ms:number){
  return new Promise(result =>{
    setTimeout(result,ms);
  })
}
