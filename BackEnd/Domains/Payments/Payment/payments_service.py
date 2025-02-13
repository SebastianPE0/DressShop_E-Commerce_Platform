from flask import Flask, request, jsonify
import stripe

app = Flask(__name__)

# Configurar Stripe con la clave secreta
stripe.api_key = "sk_test_51QREWDGgfqtUp0COZJwv15Jlwnsr0ZeANc6Yy6KNgQ3IlqI119L05n1z7Gg4XkToFWWeMNQvi2zBtcLzH7rtopI400oJGzvBmW"

@app.route('/create-payment-intent', methods=['POST'])
def create_payment_intent():
    try:
        data = request.json
        amount = int(data['amount'])  # Convertir a centavos

        # Crear la intención de pago en Stripe
        intent = stripe.PaymentIntent.create(
            amount=amount,
            currency="usd",
            payment_method_types=["card"]
        )

        return jsonify({
            "clientSecret": intent['client_secret']
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(port=5003, debug=True)
