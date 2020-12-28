# Password Universe

*If your password was at the center of a universe alongside many other passwords, what would it look like?*

Password Universe takes a different approach to password visualisation by displaying each password as if it were a star in a universe, showing the similarity and differences between passwords.

![](/docs/imgs/centered.png)
*Passwords centered around the strongest password in the universe.*

## Features

- Insights into passwords. Is a password common and fits into a tight cluster, or is it unique and lonely?
- Generatable universes. Give different parameters to generate your own universe.
- Center around a password. Click on a password to center the universe around it.
- Regex search. Show passwords that test true to a given regex expression. Want to see passwords containing the word `dog`, or passwords that contain numbers only?

![](/docs/imgs/numbers-only.png)
*Passwords containing only numbers (`^\d+$`).*

## Installation

### Requirements

Install Python 3 and virtualenv. A virtual environment is not required but is a good idea. Password Universe also depends on Pip.

### Get and Run Password Universe

Clone the repository and enter into it.

```
git clone https://github.com/samcparker/Password-Universe.git
cd Password-Universe
```

Create a virtual environment and activate it:

```
virtualenv --python=python3 venv
source venv/bin/activate
```

Install the dependencies using `pip` inside of the virtual environment:

```
pip install -r requirements.txt
```

Run the `server.py` file by double-clicking the file or using the command prompt:

```
python server.py
```

Access the webserver on the address given (by default it is `http://localhost:8000/` but can be changed in `config.json`).

## Contribute

- Issue Tracker: https://github.com/samcparker/Password-Universe/issues
- Source Code: https://github.com/samcparker/Password-Universe

## License

The project is licensed under the BSD license.