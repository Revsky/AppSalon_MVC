<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit4b79d67a3a0c3ad8eafd3cd98ac199aa
{
    public static $prefixLengthsPsr4 = array (
        'M' => 
        array (
            'Model\\' => 6,
            'MVC\\' => 4,
        ),
        'C' => 
        array (
            'Controllers\\' => 12,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Model\\' => 
        array (
            0 => __DIR__ . '/../..' . '/models',
        ),
        'MVC\\' => 
        array (
            0 => __DIR__ . '/../..' . '/',
        ),
        'Controllers\\' => 
        array (
            0 => __DIR__ . '/../..' . '/controllers',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit4b79d67a3a0c3ad8eafd3cd98ac199aa::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit4b79d67a3a0c3ad8eafd3cd98ac199aa::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit4b79d67a3a0c3ad8eafd3cd98ac199aa::$classMap;

        }, null, ClassLoader::class);
    }
}