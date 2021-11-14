import React, { useState } from 'react'
import './Datatable.scss'

function Datatable({data}) {
    const [desc, setDesc] = useState(null);
    return (
        <div className="content">
            <div className="content_left">
            {data.map((row, key) => <div className="content_details" key={key}>
                {   <>
                    <div className="details">{row.fields.episode_id}</div>
                    <div className="details_movie" onClick={() => setDesc({ descript: row.fields.opening_crawl, title: row.fields.title, director: row.fields.director})}>{row.fields.title}</div>
                    <div className="details">{row.fields.release_date}</div>
                    </>                    
                } </ div>
                
            )}
            </div>
                
            <div className="content_right">
               {(desc === null) ? <span className="no_movie">No Movies selected</span> : <><h2>{desc.title}</h2>
                <p>{desc.descript}</p>
                <span className="directed_by">Directed By: {desc.director}</span></> } 
                </div>
            </div>
    )
}

export default Datatable
