import styled from 'styled-components'
import axios from 'axios'
import { useState, useEffect } from 'react'


interface carInterface {
    mark: string,
    model: string,
    tariffs: any[]
}

const SearchSpan = styled.div`
    min-height: 42px;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: flex-start;
`;

const SearchInput = styled.input`
    height: 42px;
    width: 87%;
    border: 1px solid #5C00CE;
    margin-right: 8px;
    border-radius: 0px;
    padding: 0;
    padding-left: 20px;
    font-size: 20px;
    &:focus{
        outline: none;
    }
`;

const Button = styled.button`
    height: 44px;
    width: 12.5%;
    border: none;
    border-radius: 0px;
    background-color: #5C00CE;
    color: white;
    font-size: 20px;
`;

const Wrapper = styled.div`
    width: 100%;
    background-color: #fff;
    color:white;
    padding: 8px;
    height: auto;
`;

const Tabl = styled.table`
    background: #FFFFFF;
    width: calc(100wh-224px);
    border: 1px solid #9CA0A3;
    box-sizing: border-box;
    color:#1F232E;
    border-spacing: 0px;
    border-collapse: collapse;
    margin-top: 8px;
`;

const Th = styled.th`
    border: 1px solid #E6EBF0;
    background-color: #F7F8F9;
    height: 48px;
    text-align: center;
    &:first-child{
        padding-left: 4px;
        text-align: left;
    }
`;

const Td = styled.td`
    border: 1px solid #E6EBF0;
    height: 48px;
    background-color: #F7F8F9;
    text-align: center;
    &:first-child{
        padding-left: 4px;
        text-align: left;
    }
    width: 12.5%;
`;

export default function Table() {
    const [data, setData]: any = useState()
    // const [selected, setSelected] = useState('')

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
            <SearchSpan>
                <SearchInput type="text" placeholder="Поиск не работает ещё, я не накодил йопта" /><Button>Поиск</Button>
            </SearchSpan>
            <Tabl>
                <thead>
                    <tr>
                        <Th>Марка и модель</Th>
                        {typeof (data) !== 'undefined' ?
                            data?.tariffs_list.map((tariff: string) => (<Th key={tariff}>{tariff}</Th>)
                            ) : 'undefined'}
                    </tr>
                </thead>
                <tbody>
                    {typeof (data) !== 'undefined' ?
                        data?.cars.map((car: carInterface) => {
                            let tariffs: any = []

                            for (let i = 0; i < data.tariffs_list.length; i++) {
                                tariffs.push('-')
                            }

                            Object.keys(car.tariffs).map((tar: string) => {
                                tariffs[data.tariffs_list.indexOf(tar)] = Object.values(car.tariffs)[Object.keys(car.tariffs).indexOf(tar)].year
                                return tariffs
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
