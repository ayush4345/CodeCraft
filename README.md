# CodeCraft
IET Project Expo's Project

<h2>Server Setup Instructions:</h2>
<list>
1.Create a virtual environment (optional but recommended):
 
```bash
python3 -m venv venv
```
 
2.Activate the virtual environment:

- For Windows:
```bash
.\venv\Scripts\activate
```
- For macOS/Linux:

```bash
source venv/bin/activate
```
3.Install requirements from requirements.txt:

```bash
pip install -r requirements.txt
```

4.Change into the project directory:

```bash
cd Server
```

5.Make migrations:
```bash
python3 manage.py makemigrations
```

6.Apply database migrations:
```bash
python3 manage.py migrate
```

</list>
<h2>Usage:</h2>
Run the server:

```bash
python3 manage.py runserver
```
