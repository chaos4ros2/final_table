
// https://css.glass/
export const CountryCard = () => {
    return (
        <div className="card">
            <div className="face front">
                <h3 className="debit">Japan</h3>
                <h3 className="bank"></h3>
                <img className="chip" src="https://illustcut.com/box/world/asiaflag/asiaflag02_09.png" alt="chip" />
                <h3 className="number"></h3>
                <h5 className="valid"><span> <br /> </span><span></span></h5>
                <h5 className="card-holder"></h5>
            </div>
            {/* <div className="face back">
                <div className="blackbar"></div>
                <div className="cvvtext">
                    <div className="white-bar"></div>
                    <div className="cvv"></div>
                </div>
                <p className="text">
                </p>
            </div> */}
        </div>
    );
};