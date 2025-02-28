import axios from "axios"
import { useState, useEffect } from "react"
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner"
import { Container, Row } from "react-bootstrap"
import PhoneCard from "./../components/PhoneCard/PhoneCard.jsx"
import PhoneDetails from "../components/PhoneDetails/PhoneDetails"

const IndexPage = () => {

    useEffect(() => {
        setLoading(true)
        getPhones()
    }, [])

    const [needsDetails, setNeedsDetails] = useState(false)
    const [phoneDetails, setPhoneDetails] = useState({})
    const [loading, setLoading] = useState(false)
    const [phones, setPhones] = useState([])

    const getPhones = () => {
        setTimeout(() => {
            axios.get(`${process.env.REACT_APP_API_URL || "http://localhost:5005/api"}/telefonos`)
                .then(({ data }) => {
                    setPhones(data)
                    setLoading(false)
                })
                .catch(err => console.log(err))
        }, 1000)
    }

    return (

        <section className="index">
            {!loading ?
                !needsDetails ? (
                    <Container>
                        <Row>
                            <h1>Lista de teléfonos:</h1>
                            <h4 className="mb-3">Pulsa en alguno para ver sus detalles :)</h4>
                            <hr className="mb-3" />
                            {phones.map(phone => {
                                return <PhoneCard phone={phone} key={phone.id}
                                    setPhoneDetails={setPhoneDetails}
                                    setNeedsDetails={setNeedsDetails}
                                ></PhoneCard>
                            })}
                        </Row>
                    </Container>
                ) : (<PhoneDetails {...phoneDetails} setNeedsDetails={setNeedsDetails} />)
                : (<LoadingSpinner />)}
        </section >
    )
}
export default IndexPage