#include "rsa.h"
#include <iostream>
#include <stdexcept>

using namespace std;

RSA::RSA()
{
    p = q = n = phi = e = d = 0;
}

long long RSA::gcd(long long a, long long b)
{
    while (b != 0)
    {
        long long temp = b;
        b = a % b;
        a = temp;
    }

    return a;
}

bool RSA::isPrime(long long num)
{
    if (num < 2)
        return false;

    if (num == 2)
        return true;

    if (num % 2 == 0)
        return false;

    for (long long i = 3; i * i <= num; i += 2)
    {
        if (num % i == 0)
            return false;
    }

    return true;
}

long long RSA::modPow(long long base, long long exponent, long long modulus)
{
    long long result = 1;

    base %= modulus;

    while (exponent > 0)
    {
        if (exponent % 2 == 1)
        {
            result = (result * base) % modulus;
        }

        base = (base * base) % modulus;
        exponent /= 2;
    }

    return result;
}

long long RSA::modInverse(long long eValue, long long phiValue)
{
    for (long long dValue = 1; dValue < phiValue; dValue++)
    {
        if ((eValue * dValue) % phiValue == 1)
        {
            return dValue;
        }
    }

    return -1;
}

bool RSA::generateKeys(long long prime1, long long prime2)
{
    if (!isPrime(prime1) || !isPrime(prime2))
    {
        return false;
    }

    if (prime1 == prime2)
    {
        return false;
    }

    p = prime1;
    q = prime2;

    n = p * q;

    phi = (p - 1) * (q - 1);

    // Choose the smallest valid public exponent.
    e = 2;

    while (e < phi)
    {
        if (gcd(e, phi) == 1)
        {
            break;
        }

        e++;
    }

    d = modInverse(e, phi);

    if (d == -1)
    {
        return false;
    }

    return true;
}

long long RSA::encrypt(long long message)
{
    if (message < 0 || message >= n)
    {
        throw invalid_argument("Message must be between 0 and n-1");
    }

    return modPow(message, e, n);
}

long long RSA::decrypt(long long cipher)
{
    if (cipher < 0 || cipher >= n)
    {
        throw invalid_argument("Cipher must be between 0 and n-1");
    }

    return modPow(cipher, d, n);
}

vector<long long> RSA::encryptText(const string& text)
{
    vector<long long> encrypted;

    for (unsigned char character : text)
    {
        encrypted.push_back(encrypt(static_cast<long long>(character)));
    }

    return encrypted;
}

string RSA::decryptText(const vector<long long>& cipher)
{
    string decrypted;

    for (long long value : cipher)
    {
        long long character = decrypt(value);

        if (character < 0 || character > 255)
        {
            throw invalid_argument("Invalid encrypted text");
        }

        decrypted += static_cast<char>(character);
    }

    return decrypted;
}

long long RSA::getP() const
{
    return p;
}

long long RSA::getQ() const
{
    return q;
}

long long RSA::getN() const
{
    return n;
}

long long RSA::getPhi() const
{
    return phi;
}

long long RSA::getE() const
{
    return e;
}

long long RSA::getD() const
{
    return d;
}

void RSA::displayKeys()
{
    cout << "\n========== RSA KEYS ==========\n";

    cout << "p       : " << p << endl;
    cout << "q       : " << q << endl;
    cout << "n       : " << n << endl;
    cout << "phi(n)  : " << phi << endl;

    cout << "\nPublic Key\n";
    cout << "e = " << e << endl;
    cout << "n = " << n << endl;

    cout << "\nPrivate Key\n";
    cout << "d = " << d << endl;
    cout << "n = " << n << endl;

    cout << "==============================\n";
}