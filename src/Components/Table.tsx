import styled from 'styled-components'
import axios from 'axios'
import { useState, useEffect } from 'react'


interface carInterface {
    mark: string,
    model: string,
    tariffs: any[]
}

const Wrapper = styled.div`
    width: 100%;
    height: 828px;
    background-color: #fff;
    color:white;
`;

const Tabl = styled.table`
    background: #FFFFFF;
    width: calc(100wh-224px);
    border: 1px solid #9CA0A3;
    box-sizing: border-box;
    color:#1F232E;
    /* margin-left: 10px; */
`;

const Th = styled.th`
    border: 1px solid #E6EBF0;
    background-color: #F7F8F9;
    height: 48px;
    text-align: center;
    &:first-child{
        text-align: left;
    }
`;

const Td = styled.td`
    border: 1px solid #E6EBF0;
    height: 48px;
    background-color: #F7F8F9;
    text-align: center;
    &:first-child{
        text-align: left;
    }
    width: 12.5%;
`;

export default function Table() {
    const [data, setData]: any = useState()
    const [selected, setSelected] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(
                'https://city-mobil.ru/api/cars', {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            ).then(res => {
                const content = res.data
                setData(content)
            }).catch(error => {
                console.log(error);
            })
        }
        fetchData()
    }, [])
    return (
        <Wrapper>
            <Tabl>
                <thead>
                    <tr>
                        <Th>Марка и модель</Th>
                        {typeof (data) !== 'undefined' ?
                            data?.tariffs_list.map((tariff: string) => (<Th key={tariff} id={tariff}>{tariff}</Th>)
                            ) : ''}
                    </tr>
                </thead>
                <tbody>
                    {typeof (data) !== 'undefined' ?
                        data?.cars.map((car: carInterface) => {
                            // Object.keys(car.tariffs).map((tar: string) => console.log(tar))
                            // console.log(Object.keys(car.tariffs))
                            // console.log(Object.values(car.tariffs))
                            let tariffs: any = []

                            for (let i = 0; i < data.tariffs_list.length; i++) {
                                tariffs.push('-')
                            }

                            Object.keys(car.tariffs).map((tar: string) => {
                                tariffs[data.tariffs_list.indexOf(tar)] = Object.values(car.tariffs)[Object.keys(car.tariffs).indexOf(tar)].year
                            })

                            return (<tr>
                                <Td>{car.mark} {car.model}</Td>
                                {tariffs.map((tar: string) => (<Td>{tar}</Td>))}
                            </tr>)
                        }
                        ) : ''}
                </tbody>
            </Tabl>
        </Wrapper>
    )
}
