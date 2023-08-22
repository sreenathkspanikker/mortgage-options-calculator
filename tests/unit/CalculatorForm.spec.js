import { shallowMount } from '@vue/test-utils';
import CalculatorForm from '@/components/CalculatorForm.vue';
import { fetchGraphQLQuery } from '@/graphql.js';

jest.mock('@/graphql.js');

describe('CalculatorForm', () => {
  it('should fetch mortgage data and update options', async () => {
    // Mock the fetchGraphQLQuery method with resolved data
    fetchGraphQLQuery.mockResolvedValue({
      data: {
        root: {
          ratesTable: {
            5: { borrowingRate: 0.7, monthlyRate: 710.24 },
            10: { borrowingRate: 0.75, monthlyRate: 723.39 },
            15: { borrowingRate: 1.04, monthlyRate: 799.68 },
            20: { borrowingRate: 1.32, monthlyRate: 873.33 },
            25: { borrowingRate: 1.89, monthlyRate: 1023.27 },
            30: { borrowingRate: 1.94, monthlyRate: 1036.43 },
          },
        },
      },
    });

    const wrapper = shallowMount(CalculatorForm);

    // Set initial data values for testing
    wrapper.setData({
      propertyPrice: 100000,
      annualRepaymentRate: 2,
      totalSavings: 50000,
    });

    // Trigger submitForm method
    await wrapper.vm.submitForm();

    // Assert that options are updated
    expect(wrapper.vm.options).toEqual({
      5: { borrowingRate: 0.7, monthlyRate: 710.24 },
      10: { borrowingRate: 0.75, monthlyRate: 723.39 },
      15: { borrowingRate: 1.04, monthlyRate: 799.68 },
      20: { borrowingRate: 1.32, monthlyRate: 873.33 },
      25: { borrowingRate: 1.89, monthlyRate: 1023.27 },
      30: { borrowingRate: 1.94, monthlyRate: 1036.43 },
    });
  });

});
