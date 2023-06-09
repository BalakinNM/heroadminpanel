import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { useHttp } from '../../hooks/http.hook';

import { fetchFilters, selectAll} from '../heroesFilters/filterSlice';
import { useCreateHeroMutation } from '../../api/apiSlice';


const HeroesAddForm = () => {
    const [heroName, setHeroName] = useState('');
    const [heroDescr, setHeroDescr] = useState('');
    const [heroElement, setHeroElement] = useState('');

    const dispatch = useDispatch();
    const {request} = useHttp();
    const [createHero, {isLoading}] = useCreateHeroMutation();

    const filters = useSelector(selectAll)



    useEffect(() => {
        dispatch(fetchFilters(request))
            // eslint-disable-next-line
    }, [])


    const onSubmitHandler = (e) => {
        e.preventDefault();
        const newHero = {
            id: uuidv4(),
            name: heroName,
            description: heroDescr,
            element: heroElement
        }
        createHero(newHero).unwrap();

        e.target.reset()
        setHeroName('');
        setHeroDescr('');
        setHeroElement('');
    }
    const renderOptions = (options) => {
        return options.map(filter => {
            return <option key={filter.id} value={filter.element}>{filter.description}</option>
        })
    }

    const options = renderOptions(filters)
    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    onChange={(e) => setHeroName(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    onChange={(e) => setHeroDescr(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    onChange={(e) => setHeroElement(e.target.value)}>
                    {options}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;