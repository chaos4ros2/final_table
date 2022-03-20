
// https://css.glass/
type Props = {
    flagUrl: string;
    countryName: string;
};

export const CountryCard = ({ flagUrl, countryName }: Props) => {
    return (
        <div className="card">
            <div className="face front">
                <h3 className="debit">{countryName}</h3>
                <h3 className="bank"></h3>
                <img className="chip" src={flagUrl} alt="chip" />
                <h3 className="number"></h3>
                <h5 className="valid"><span> <br /> </span><span></span></h5>
                <h5 className="card-holder"></h5>
            </div>
        </div>
    );
};