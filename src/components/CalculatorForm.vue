<template>
    <div class="app-mortgage">
        <div class="app-mortgage-content">
            <h2>Mortgage Calculate</h2>
            <form @submit.prevent="submitForm" class="mortgage-form">
                <div class="input-row">
                    <label for="propertyPrice">
                        Property Purchase Price:
                        <input id="propertyPrice" type="number" v-model="propertyPrice" @input="validatePropertyPrice"
                            required />

                    </label>
                    <label for="totalSavings">
                        Total Savings:
                        <input id="totalSavings" type="number" v-model="totalSavings" @input="validateTotalSavings"
                            required /> </label>
                </div>
                <div class="input-row">
                    <label for="annualRepaymentRate">
                        Annual Repayment Rate (%):
                        <input id="annualRepaymentRate" type="number" v-model="annualRepaymentRate"
                            @input="validateAnnualRepaymentRate" required /> </label>
                    <label for="realEstateCommission">
                        Real Estate Commission:
                        <select id="realEstateCommission" v-model="realEstateCommission">
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </label>
                </div>
                <div class="form-footer">
                    <button type="submit" class="btn-submit">Calculate</button>
                </div>
            </form>
        </div>
        <div class="app-mortgage-info">
            <p>Implied Loan: <strong>{{ formatCurrency(impliedLoan) }}</strong></p>
            <p>Loan to Value: <strong>{{ loanToValue.toFixed(2) }}%</strong></p>
        </div>

        <!-- Display mortgage options if available -->
        <CalculatorResults v-if="options" :options="options" />
    </div>
</template>

<script>
import CalculatorResults from '@/components/CalculatorResults.vue';
import { fetchGraphQLQuery } from '@/graphql.js';

export default {
    name: "CalculatorForm",
    components: {
        CalculatorResults,
    },
    data() {
        return {
            propertyPrice: 0,
            totalSavings: 0,
            annualRepaymentRate: 0,
            realEstateCommission: 'false',
            impliedLoan: 0,
            loanToValue: 0,
            options: null,
        };
    },
    methods: {
        validatePropertyPrice() {
            if (this.propertyPrice < 0) {
                this.propertyPrice = 0;
            }
        },
        validateTotalSavings() {
            if (this.totalSavings < 0) {
                this.totalSavings = 0;
            }
        },
        validateAnnualRepaymentRate() {
            if (this.annualRepaymentRate < 0) {
                this.annualRepaymentRate = 0;
            }
        },
        async submitForm() {
            if (this.propertyPrice <= this.totalSavings) {
                // Display an error message or prevent form submission
                console.log('Property price must be greater than total savings');
                return;
            }
            this.impliedLoan = this.calculateImpliedLoan();
            this.loanToValue = this.calculateLoanToValue();

            const response = await fetchGraphQLQuery();

            const options = response.data.root.ratesTable;
            // Assigning fetched options to the property
            this.options = options;

            // Emitting the options-loaded event
            this.$emit('options-loaded', options);
        },
        calculateImpliedLoan() {
            return this.propertyPrice - this.totalSavings;
        },
        calculateLoanToValue() {
            const loanToValue = (this.impliedLoan / this.propertyPrice) * 100;
            return loanToValue;
        },
        formatCurrency(value) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(value);
        },
    },
};
</script>
  
<style scoped>
* {
    box-sizing: border-box;
}

.app-mortgage {
    margin: 0 auto;
    max-width: 550px;
}

.app-mortgage-content {
    width: 100%;
    background-color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    text-align: left;
}

h2 {
    margin: 0;
    padding: 30px;
}

.mortgage-form {
    display: flex;
    gap: 20px;
    flex-direction: column;
    align-items: center;
}

.input-row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 20px;
    text-align: left;
    padding: 0 30px;
}

.input-row label {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 14px;
    font-weight: 600;
    color: #686868;
}

.input-row input,
.input-row select {
    width: 100%;
    height: 35px;
    padding: 6px;
    border-radius: 4px;
    background: #f4f4f4;
    border: 1px solid #dbdbdb;
}

.form-footer {
    width: 100%;
    padding: 20px 30px;
    display: flex;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
}

.btn-submit {
    background-color: rgb(27, 131, 145);
    color: white;
    font-weight: bold;
    border: none;
    height: 35px;
    width: 100%;
    max-width: 150px;
    margin-left: auto;
    cursor: pointer;
    border-radius: 4px;
}

.btn-submit:hover {
    background-color: #14626d;
}

.app-mortgage-info {
    display: flex;
    align-items: center;
    gap: 20px;
    margin: 20px 0;
}

.app-mortgage-info p {
    width: 100%;
    padding: 15px;
    text-align: left;
    font-size: 14px;
    background-color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    margin: 0;
}

.app-mortgage-info p strong {
    display: block;
    font-size: 24px;
    margin-top: 8px;
}

/* Media query for screens narrower than 768px */
@media (max-width: 768px) {

    h2 {
        font-size: 18px;
    }

    .input-row {
        flex-direction: column;
    }

    .btn-submit {
        max-width: 100%;
    }

    .app-mortgage-info {
        flex-direction: column;
    }

    .app-mortgage-info p {
        margin: 0;
    }
}
</style>
  