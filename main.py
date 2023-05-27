import webview
import os
import os.path

# Шлях до скрипта
script_path = os.path.abspath(__file__)

# Каталог в якому знаходиться файл скрипта
script_directory = os.path.dirname(script_path)

# Об'єднати шлях до каталогу скрипта з ім'ям файлу
file_path = os.path.join(script_directory, 'web/index.html')
file_path=file_path.replace('\\', '/')

# WebView застосунок
def open_webview():
     webview.create_window("Tic Tac Toe", file_path)
     webview.start()

if __name__ == '__main__':
     open_webview()
