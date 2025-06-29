import { computed, inject } from '@angular/core';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { PeriodicTableService } from './books-service';
import { EditType, PeriodicElement } from './data'



type PeriodicTableState = {
  elements: PeriodicElement[];
  filteredElements: PeriodicElement[];
  isLoading: boolean;
  filter: string;
};

const initialState: PeriodicTableState = {
  elements: [],
  filteredElements: [],
  isLoading: false,
  filter: "",
};

export const PeriodicTableStore = signalStore(
  withState(initialState),
  withMethods((store, periodicTableService:any = inject(PeriodicTableService)) => ({
    async loadElements(){
      patchState(store,{isLoading:true})
      const result = await periodicTableService.getElements()
      patchState(store,{elements:result,filteredElements:result.filter((e:PeriodicElement) => e.load),isLoading:false})
    },
    async editElement(element:PeriodicElement,value:string,type:EditType){
          patchState(store,{isLoading:true})
          const result = await periodicTableService.editElement(element,value,type)
          patchState(store,(state) =>({
            elements: state.elements.map(e => e.id == result.id ? {...result}:e),
            isLoading:false
          }))
    },
    async editFilter(filter:string){
        patchState(store,{isLoading:true})
        const result = await periodicTableService.editFilter(filter,store.elements())
        console.log(result)
        patchState(store,{filter,filteredElements:result})
    }
  }))
);
