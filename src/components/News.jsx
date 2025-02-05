export default function News({ news }) {
    return (
        <div className='news-list'>
            {news.length > 0 && news.map(item => {
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