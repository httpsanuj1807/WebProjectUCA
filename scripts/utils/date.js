
export function isWeekend(dayJsObj,deliveryId){

    let date=dayJsObj; // current data and time object

    while(deliveryId>0){


      // day js add doc https://day.js.org/docs/en/manipulate/add
      date=date.add(1,'days'); // going to next day

      if(date.format('ddd')==='Sat' || date.format('ddd')==='Sun'){

        continue;

      }
      else{

        deliveryId--; 

      }
      
    }

    return date;

}
