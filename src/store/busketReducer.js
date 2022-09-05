import { createSlice } from "@reduxjs/toolkit";

const initBusketState = {
  busketCounter: 0,
  busketProducts: [],
  chosenAtts: [],
};

export const busketSlice = createSlice({
  name: "busket",
  initialState: initBusketState,
  reducers: {
    setBusketProducts: (state, action) => {
      let isInBusket = { bool: false, index: "" };
      if (state.busketProducts.length !== 0) {
        state.busketProducts.forEach((prod, indexProd) => {
          if (prod.id === action.payload.id) {
            if (
              prod.chosenAtt.every((prodAtt, index) => {
                return (
                  prodAtt.attId === action.payload.chosenAtt[index].attId &&
                  prodAtt.attItemId ===
                    action.payload.chosenAtt[index].attItemId
                );
              })
            ) {
              isInBusket.bool = true;
              isInBusket.index = indexProd;
              return isInBusket;
            }
          }
        });
      }

      state.busketCounter++;
      if (isInBusket.bool) {
        state.busketProducts[isInBusket.index].amount++;
      } else {
        state.busketProducts.push(action.payload);
      }
      state.chosenAtts = [];
    },
    setChosenAtts: (state, action) => {
      state.chosenAtts.push(action.payload);
    },

    updateChosenAtts: (state, action) => {
      state.chosenAtts.forEach((att) => {
        if (
          att.attId === action.payload.attId &&
          att.attItemId !== action.payload.attItemId
        ) {
          att.attItemId = action.payload.attItemId;
        }
      });
    },

    saveCounterForProduct: (state, action) => {
      state.busketProducts.forEach((prod) => {
        if (prod.id === action.payload.productId) {
          if (prod.chosenAtt.length !== 0) {
            
            if (
              prod.chosenAtt.every(
                (att, index) =>
                  att.attId === action.payload.atts[index].attId &&
                  att.attItemId === action.payload.atts[index].attItemId
              )
            ) {
              if (action.payload.type === "plus") {
                prod.amount++;
                state.busketCounter++;
              }
              if (action.payload.type === "minus") {
                if (prod.amount > 1) {
                  if (prod.amount === 1) {
                    return;
                  }
                  prod.amount--;
                  state.busketCounter--;
                }
              }
            }
          } else {
            if (action.payload.type === "plus") {
              prod.amount++;
              state.busketCounter++;
            }
            if (action.payload.type === "minus") {
              if (prod.amount > 1) {
                if (prod.amount === 1) {
                  return;
                }
                prod.amount--;
                state.busketCounter--;
              }
            }
          }
        }
      });
    },
    deleteFromBusket: (state, action) => {
      state.busketProducts.forEach((prod, index) => {
        if (prod.id === action.payload.id && index === action.payload.index) {
          state.busketProducts.splice(action.payload.index, 1);
        }
      });

      state.busketCounter = 0;
      state.busketProducts.forEach((prod) => {
        state.busketCounter += prod.amount;
      });
    },
  },
});

export default busketSlice.reducer;
