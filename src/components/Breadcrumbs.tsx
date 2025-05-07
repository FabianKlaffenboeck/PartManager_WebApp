import {Link, useLocation} from 'react-router-dom'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import React from 'react'

export function Breadcrumbs() {
    const location = useLocation()
    const segments = location.pathname.split('/').filter(Boolean)

    return (<Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to="/home">Home</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                {segments.map((segment, index) => {
                    const path = '/' + segments.slice(0, index + 1).join('/')

                    const label = segment
                        .replace(/-/g, ' ')
                        .replace(/\b\w/g, l => l.toUpperCase())

                    return (<React.Fragment key={path}>
                            <BreadcrumbSeparator className="hidden md:block"/>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link to={path}>{label}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </React.Fragment>)
                })}


            </BreadcrumbList>
        </Breadcrumb>

    )
}
