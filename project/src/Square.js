const Square = ({ value, onSquareClick, isHighlight }) => {

    const className = isHighlight ? "square-highlight" : "square";
    return (
        <button className={className} onClick={onSquareClick}>
            {value}
        </button>
    );
}

export default Square;