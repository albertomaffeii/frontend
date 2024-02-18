import React, { useContext, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [configurations, setConfigurations] = useState([]);
    const [error, setError] = useState(null);

    //calculate incomes
    const addConfiguration = async (configuration) => {
        const response = await axios
            .post(`${BASE_URL}add-configuration`, configuration)
            .catch((err) => {
                setError(err.response.data.message);
            });
        getConfigurations();
    };

    const getConfigurations = async () => {
        const response = await axios.get(`${BASE_URL}get-configurations`);
        setConfigurations(response.data.configurations); // Corrigido para setConfigurations
        console.log(response.data);
    };

    const deleteConfiguration = async (id) => {
        const res = await axios.delete(`${BASE_URL}delete-configuration/${id}`);
        getConfigurations();
    };

    //calculate incomes
    const addIncome = async (income) => {
        const response = await axios
            .post(`${BASE_URL}add-income`, income)
            .catch((err) => {
                setError(err.response.data.message);
            });
        getIncomes();
    };

    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`);
        setIncomes(response.data.incomes); // Assumindo que o servidor retorna um objeto com uma propriedade 'incomes'
        console.log(response.data);
    };

    const deleteIncome = async (id) => {
        const res = await axios.delete(`${BASE_URL}delete-income/${id}`);
        getIncomes();
    };

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) => {
            totalIncome = totalIncome + income.amount;
        });

        return totalIncome;
    };

    //calculate incomes
    const addExpense = async (income) => {
        const response = await axios
            .post(`${BASE_URL}add-expense`, income)
            .catch((err) => {
                setError(err.response.data.message);
            });
        getExpenses();
    };

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`);
        setExpenses(response.data.expenses); // Corrigido para setExpenses
        console.log(response.data);
    };

    const deleteExpense = async (id) => {
        const res = await axios.delete(`${BASE_URL}delete-expense/${id}`);
        getExpenses();
    };

    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income) => {
            totalIncome = totalIncome + income.amount;
        });

        return totalIncome;
    };

    const totalBalance = () => {
        const balance = totalIncome() - totalExpenses();
        return parseFloat(balance.toFixed(2));
    };

    const transactionHistory = () => {
        const history = [...incomes, ...expenses];
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

        return history.slice(0, 3);
    };

    return (
        <GlobalContext.Provider
            value={{
                addConfiguration,
                getConfigurations,
                configurations,
                deleteConfiguration,
                addIncome,
                getIncomes,
                incomes,
                deleteIncome,
                expenses,
                totalIncome,
                addExpense,
                getExpenses,
                deleteExpense,
                totalExpenses,
                totalBalance,
                transactionHistory,
                error,
                setError,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
