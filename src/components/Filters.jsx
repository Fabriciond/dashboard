import './components.css';
export const FiltersComponent = () => {
    return (
        <>
            <div className="wrapper-filters">
                <div className="filters">

                    <div className="filter">
                        <label htmlFor="">Fecha inicio</label>
                        <input type="date" name="" id="" />
                    </div>
                    <div className="filter">
                        <label htmlFor="">Fecha fin</label>
                        <input type="date" name="" id="" />
                    </div>


                </div>
                <div className='filters'>
                    <button onClick={() => console.log("hola")}> Filtrar</button>
                </div>
            </div>
        </>
    )

}