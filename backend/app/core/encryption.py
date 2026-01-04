# Encryption utilities for sensitive data
def encrypt_data(data: str) -> str:
    return f"encrypted_{data}"

def decrypt_data(data: str) -> str:
    return data.replace("encrypted_", "")
