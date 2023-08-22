import { shallowMount } from "@vue/test-utils";
import CalculatorResults from "@/components/CalculatorResults.vue";

describe("CalculatorResults", () => {
  it("displays mortgage options correctly", () => {
    const options = {
      5: { borrowingRate: 0.7, monthlyRate: 710.24 },
      10: { borrowingRate: 0.75, monthlyRate: 723.39 },
      15: { borrowingRate: 1.04, monthlyRate: 799.68 },
      20: { borrowingRate: 1.32, monthlyRate: 873.33 },
      25: { borrowingRate: 1.89, monthlyRate: 1023.27 },
      30: { borrowingRate: 1.94, monthlyRate: 1036.43 },
    };

    const wrapper = shallowMount(CalculatorResults, {
      propsData: {
        options: options,
      },
    });

    const rows = wrapper.findAll("tbody tr");

    Object.keys(options).forEach((year, index) => {
      const row = rows.at(index);
      const cells = row.findAll("td");
      const option = options[year];

      expect(cells.at(0).text()).toBe(year);
      expect(cells.at(1).text()).toBe(
        new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(option.monthlyRate)
      );
      expect(cells.at(2).text()).toBe(option.borrowingRate.toFixed(2) + "%");
    });
  });
});
