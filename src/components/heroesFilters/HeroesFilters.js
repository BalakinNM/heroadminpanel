import { useDispatch, useSelector } from 'react-redux';
import { filterChanged, selectAll } from './filterSlice'; 
import store from '../../store';
import classNames from 'classnames';

const HeroesFilters = () => {
    const {activeFilter} = useSelector(state => state.filters);
    const dispatch = useDispatch()
    const filters = selectAll(store.getState());

   
    const renderButtons = (filters, activeFilter) => {
        return filters.map(btn => {
            const btnClass = classNames('btn', btn.className, {
                'active': btn.element === activeFilter 
            })
            return <button 
            className={btnClass} 
            key={btn.id}
            onClick={() => dispatch(filterChanged(btn.element))}
            >{btn.label}</button>
        })
    }
    const buttons = renderButtons(filters, activeFilter)
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {buttons}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;