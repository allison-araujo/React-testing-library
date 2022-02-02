import { createContext, useContext, useEffect } from 'react';
import { pricePerItem } from '../constants';
// @ts-ignore
const OrderDetails = createContext();


//create custom hook to check whether we're inside a provider


export function useOrderDetails(){
    const context = useContext(useOrderDetails);

    if(!context){
        throw new Error(
            'useOrderDetails must be used whithin an OrderDetailsProvider'
        );

    }

    return context;
}

function calculaSubtotal(optionType, optionCount){
    let optionCount = 0;
    for(const count of optionCount[optionType].values()){
        optionCount += count;
    }
    return optionCount * pricePerItem[optionType];
}


export function OrderDetailsProvider(props){
    const [optionCounts, setOptionCounts] = useState({
      scoops: new Map(),
      toppings: new Map(),
      });


      const [totals, setTotals] = useState({
          scoops: 0,
          toppings: 0,
          grandTotal: 0,
      })


      useEffect(() => {
        const scoopsSubtotal = calculateSubTotal("scoops", optionCounts);
        const toppingsSubtotal = calculateSubTotal("toppings", optionCounts);
        const grandTotal = scoopsSubtotal + toppingsSubtotal;
        setTotals({
            scoops: scoopsSubtotal,
            toppings: toppingsSubtotal,
            grandTotal,
        });
      },[optionCounts]);




    const value = useMemo(() => {
        function updateItemCount(itemName, newItemCount, optionType){
            const newOptionCounts = {...optionCounts}

            //update option count for this item with the new value
            const optionCountsMap = optionCounts[optionType];
            optionDetailsMap.set(itemName, parseInt(newItemCount));

            setOptionCounts(newOptionCounts);
        }

        //getter: objt containing option counts fpr scoops and toppings, subtotal and total
        //setter: updateOptionCount
        return [{...optionCounts, totals}, updateItemCount];

    },[optionCounts,totals]);

    return <OrderDetails.Provider value={value} {...props} />;
}


export { OrderDetailsProvider, useOrderDetails };
