import { useState } from 'react';
import './App.css';

function App() {
  const [cards, setCadrs] = useState([
    {
      id: 1,
      title: 'Сделать',
      items: [
        { id: 1, title: 'Пойти в магазин' },
        { id: 2, title: 'Вынести мусор' },
        { id: 3, title: 'Купить хлеб' }
      ]
    },
    {
      id: 2,
      title: 'Проверить',
      items: [
        { id: 4, title: 'Забрать ребенка из сада' },
        { id: 5, title: 'Помыть посуду' },
        { id: 6, title: 'Накормить кота' }
      ]
    },
    {
      id: 3,
      title: 'Сделано',
      items: [
        { id: 7, title: 'Приготовить ужин' },
        { id: 8, title: 'Посмотреть уроки' },
        { id: 9, title: 'Написать конспект' }
      ]
    },
  ])

  const [currentBoard, setCurrentBoard] = useState(null)
  const [currentItem, setCurrentItem] = useState(null)

  const dragOver = (e) => {
    e.preventDefault()
    if (e.target.className === 'item') {
      e.target.style.boxShadow = '0 2px 3px gray'
    }

  }

  const dragStart = (e, board, item) => {
    setCurrentBoard(board)
    setCurrentItem(item)

  }
  const dragEnd = (e) => {
    e.target.style.boxShadow = 'none'

  }

  const dragLeave = (e) => {
    e.target.style.boxShadow = 'none'

  }

  const drop = (e, board, item) => {
    e.preventDefault()
    e.target.style.boxShadow = 'none'

    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIndex, 1)
    const dropIndex = board.items.indexOf(item)
    board.items.splice(dropIndex + 1, 0, currentItem)
    setCadrs(cards.map(b => {
      if (b.id === board.id) {
        return board
      }
      if (b.id === currentBoard.id) {
        return currentBoard
      }
      return b
    }))

  }

  const dropCardHandler = (e, board) => {
    const currentId = board.items.map(item => item.id)
    if (!currentId.includes(currentItem.id)) {
      board.items.push(currentItem)
      const currentIndex = currentBoard.items.indexOf(currentItem)
      currentBoard.items.splice(currentIndex, 1)
      setCadrs(cards.map(b => {
        if (b.id === board.id) {
          return board
        }
        if (b.id === currentBoard.id) {
          return currentBoard
        }
        return b
      }))
    }
    

  }
  return (
    <div className="app">
      {cards.map(board =>
        <div
          className='board'
          key={board.id}
          onDragOver={(e) => dragOver(e)}
          onDrop={(e) => dropCardHandler(e, board)}

        >
          <div className="board__title">{board.title}</div>
          {board.items.map(item =>
            <div
              draggable={true}
              className='item'
              key={item.id}
              onDragStart={(e) => dragStart(e, board, item)}
              onDragLeave={(e) => dragLeave(e)}
              onDragEnd={(e) => dragEnd(e)}
              onDragOver={(e) => dragOver(e)}
              onDrop={(e) => drop(e, board, item)}
            >
              {item.title}
            </div>
          )}
        </div>)}
    </div>
  );
}

export default App;
