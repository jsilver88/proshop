import { useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { Row, Col, Image, ListGroup, Button, Card, Form } from "react-bootstrap"
import Rating from "../components/Rating"
import { useGetProductDetailsQuery } from "../slices/productsApiSlice"
import { addToCart } from "../slices/cartSlice"
import { useDispatch } from "react-redux"
import Loader from "../components/Loader"
import Message from "../components/Message"

const ProductScreen = () => {
  const { id: productId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [qty, setQty] = useState(1)

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId)

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }))
    navigate("/cart")
  }

  // const [product, setProduct] = useState({})
  // const { id: productId } = useParams()

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     const { data } = await axios.get(`/api/products/${productId}`)
  //     setProduct(data)
  //   }
  //   fetchProduct()
  // }, [productId])

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Link className="btn btn-light my-3" to="/">
            Go Back
          </Link>

          <Row>
            <Col md={5}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>{product.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>
                          {[
                            product.countInStock > 0
                              ? "In Stock"
                              : "Out Of Stock",
                          ]}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (count) => (
                                <option key={count + 1} value={count + 1}>
                                  {count + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}
export default ProductScreen
