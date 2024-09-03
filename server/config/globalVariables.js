let globalData = {
  mealOneS:'',
  mealOneE:'',
  mealTwoS:'',
  mealTwoE:'',
  mealThreeS:'',
  mealThreeE:'',
  mealFourS:'',
  mealFourE:'',
};

module.exports = {
  getSomeValue: () => globalData.someValue,
  setSomeValue: (newValue) => {
    globalData.someValue = newValue;
  },
};
