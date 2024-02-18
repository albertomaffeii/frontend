import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { InnerLayout } from "../../styles/Layouts";
import Form from "../Form/Form";
//import ConfigurationItem from "../ConfigurationItem/ConfigurationItem";
import ConfigurationForm from "./ConfigurationForm";

function Configurations() {
    const {
        addConfiguration,
        configurations,
        getConfigurations,
        deleteConfiguration,
        totalConfigurations,
    } = useGlobalContext();

    useEffect(() => {
        getConfigurations();
    }, []);

    return (
        <ConfigurationStyled>
            <InnerLayout>
                <h1>Configurations</h1>
                <h2 className="total-configuration">
                    Total Configuration: <span> </span>
                </h2>
                <div className="configuration-content">
                    <div className="form-container">
                        <ConfigurationForm />
                    </div>
                    <div className="configurations">
                        {configurations.map((configuration) => {
                            const {
                                _id,
                                title,
                                amount,
                                date,
                                category,
                                description,
                                type,
                            } = configuration;
                            console.log(configuration);
                            /*return (
                                <ConfigurationItem
                                    key={_id}
                                    id={_id}
                                    title={title}
                                    description={description}
                                    amount={amount}
                                    date={date}
                                    type={type}
                                    category={category}
                                    indicatorColor="var(--color-green)"
                                    deleteItem={deleteConfiguration}
                                />
                            );*/
                        })}
                    </div>
                </div>
            </InnerLayout>
        </ConfigurationStyled>
    );
}

const ConfigurationStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-configuration {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fcf6f9;
        border: 2px solid #ffffff;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: 0.5rem;
        span {
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-green);
        }
    }
    .configuration-content {
        display: flex;
        gap: 2rem;
        .configurations {
            flex: 1;
        }
    }
`;

export default Configurations;
