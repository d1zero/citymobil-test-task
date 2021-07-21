import styled from 'styled-components'
import axios from 'axios'
import { useState, useEffect } from 'react'


interface carInterface {
    mark: string,
    model: string,
    tariffs: any[]
}

const Selected = styled.div`
    color: #1F232E;
    background-color: #F7F8F9;
    margin: 16px 0;
    height: 42px;
    font-size: 20px;
    display: flex;
    align-items: center;
    padding-left: 16px;
`;

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
    padding-left: 16px;
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
    border: 1px solid #9CA0A3;
    box-sizing: border-box;
    color:#1F232E;
    border-spacing: 0px;
    border-collapse: collapse;
    margin-top: 8px;
    width: 100%;
`;

const Th = styled.th`
    border: 1px solid #E6EBF0;
    background-color: #F7F8F9;
    height: 48px;
    text-align: center;
    cursor: pointer;
    &:first-child{
        padding-left: 16px;
        text-align: left;
    }
`;

const Td = styled.td`
    border: 1px solid #E6EBF0;
    height: 48px;
    background-color: #F7F8F9;
    text-align: center;
    &:first-child{
        padding-left: 16px;
        text-align: left;
    }
    width: 12.5%;
    cursor: pointer;
`;

export default function Table() {
    const [data, setData]: any = useState()
    const [selected, setSelected] = useState('')
    // const [sortDirection, setSortDirection] = useState('')

    function changeSelected(mark: string, model: string, tar: string) {
        tar === '-'
            ? setSelected(mark + ' ' + model)
            : setSelected(mark + ' ' + model + ' ' + tar + ' года выпуска')
        return selected
    }


    function sortTable(index: string) {
        // const tbody = table?.querySelector('tbody')
        // if (tbody) {
        //     const compare = function (rowA: any, rowB: any) {
        //         if (sortDirection === 'up-down') {
        //             console.log(rowB.cells[index].innerHTML);
        //             setSortDirection('down-up')
        //             return rowA.cells[index].innerHTML - rowB.cells[index].innerHTML
        //         } else {
        //             setSortDirection('up-down')
        //             return rowB.cells[index].innerHTML - rowA.cells[index].innerHTML
        //         }
        //     }
        //     let rows = [].slice.call(tbody.rows);
        //     rows.sort(compare);
        //     console.log(rows);

        //     table?.removeChild(tbody);
        //     for (let i = 0; i < rows.length; i++) {
        //         tbody.appendChild(rows[i])
        //     }
        //     table?.appendChild(tbody)
        // }
    }

    function search() {
        var inputValue = (document?.getElementById('search') as HTMLInputElement)?.value.toLowerCase();
        var table = document.querySelector('table');
        var tbody = table?.querySelector('tbody')
        let len = table?.rows.length

        if (len && tbody && table) {
            if (inputValue !== '') {
                for (let i = 1; i < len; i++) {
                    if (table?.rows[i].cells[0].innerHTML.toLowerCase().startsWith(inputValue)) {
                        table?.rows[i].setAttribute('style', 'display: ""')
                    } else {
                        table?.rows[i].setAttribute('style', 'display: none')
                    }
                }
            } else {
                for (let i = 1; i < len; i++) {
                    table?.rows[i].removeAttribute('style')
                }
            }
        }
    }

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
                <SearchInput type="text" id="search" placeholder="Поиск не работает ещё, я не накодил йопта" /><Button onClick={search}>Поиск</Button>
            </SearchSpan>
            <Selected>
                {selected === '' ? 'Никакой автомобиль не выбран' : `Выбран автомобиль ${selected}`}
            </Selected>
            <Tabl id="table">
                <thead>
                    <tr>
                        <Th datatype='text' onClick={() => sortTable('0')}>Марка и модель</Th>
                        {typeof (data) !== 'undefined' ?
                            data?.tariffs_list.map((tariff: string) => (<Th datatype='text' onClick={() => sortTable((data.tariffs_list.indexOf(tariff) + 1).toString())} key={tariff}>{tariff}</Th>)
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

                            return (<tr id={car.mark + ' ' + car.model}>
                                <Td onClick={() => changeSelected(car.mark, car.model, '-')}>{car.mark} {car.model}</Td>
                                {tariffs.map((tar: string) => (<Td onClick={() => changeSelected(car.mark, car.model, tar)}>{tar}</Td>))}
                            </tr>)
                        }
                        ) : ''}
                </tbody>
            </Tabl>
            <Selected>
                {selected === '' ? 'Никакой автомобиль не выбран' : `Выбран автомобиль ${selected}`}
            </Selected>
        </Wrapper>
    )
}
