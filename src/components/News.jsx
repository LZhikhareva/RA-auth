export default function News(props) {
    return (
        <div className='news-list'>
            {props.news.length > 0 && props.news.map(item => {
                return (
                    <div className='news-card' key={item.id}>
                        <img src={item.image} className='news-img' />
                        <div className='item-title'>{item.title}</div>
                        <div className="item-content">{item.content}</div>
                    </div>
                )
            })}
        </div>
    )
}