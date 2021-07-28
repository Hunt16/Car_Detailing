from setuptools import setup, find_packages

with open('requirements.txt') as f:
	install_requires = f.read().strip().split('\n')

# get version from __version__ variable in car_detailing/__init__.py
from car_detailing import __version__ as version

setup(
	name='car_detailing',
	version=version,
	description='Car Detailing',
	author='tailorraj',
	author_email='raaj@akhilaminc.com',
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
