import Vue from "vue";

Vue.filter("slice", function (value, max) {
  if(value.length > max) {
    return value.slice(0, max);
  } else {
    return value;
  }

})
